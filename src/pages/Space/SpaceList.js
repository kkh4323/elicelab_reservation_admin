import React, { useCallback, useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link, useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap"
import classnames from "classnames"
import { isEmpty } from "lodash"

//Import Star Ratings
// import StarRatings from "react-star-ratings";

// RangeSlider
// import Nouislider from "nouislider-react";
// import "nouislider/distribute/nouislider.css";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import data
// import { discountData, productsData } from "common/data";

//Import actions
// import { getProducts as onGetProducts } from "store/e-commerce/actions";

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import { handleSearchData } from "components/Common/searchFile"
import Paginations from "components/Common/Pagination"
import Spinners from "components/Common/Spinner"
import axios from "axios"

const SpaceList = () => {
  //meta title
  document.title = "Products | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const EcommerenceProductsProperties = createSelector(
    state => state.ecommerce,
    Ecommerce => ({
      // products: Ecommerce.products,
      // loading: Ecommerce.loading
    })
  )

  // const {
  //   products, loading
  // } = useSelector(EcommerenceProductsProperties);

  const [isLoading, setLoading] = useState(false)
  const [spaceList, setspaceList] = useState([])
  const [activeTab, setActiveTab] = useState("1")
  const [location, setLocation] = useState([])
  const [zone, setZone] = useState([])

  const url = (location = [], zone = []) => {
    const baseUrl = "https://localhost/api/space"
    const params = new URLSearchParams()

    if (location.length > 0) {
      params.append("location", location.join(","))
    }

    if (zone.length > 0) {
      params.append("zone", zone.join(","))
    }

    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl
  }

  const getSpaceInfos = async (location, zone) => {
    try {
      const { data, status } = await axios.get(url(location, zone))
      console.log("url: ", url(location, zone))
      console.log("spaceDatas: ", data.body.data)
      if (status === 200) {
        setspaceList(data.body.data)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getSpaceInfos(location, zone)
  }, [location, zone])

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  //Product Filter with noUi slider
  const [minCost, setMinCost] = useState(0)
  const [maxCost, setMaxCost] = useState(500)

  const onUpdate = useCallback(
    value => {
      // const filterData = (products || [])?.filter((i) => {
      //   return i.newPrice >= minCost && i.newPrice <= maxCost
      // })
      // setspaceList(filterData)
      // setMinCost(value[0]);
      // setMaxCost(value[1]);
    },
    [minCost, maxCost, []]
  )

  useEffect(() => {
    onUpdate([minCost, maxCost])
  }, [minCost, maxCost, onUpdate])

  /*
  on change rating checkbox method
  */
  const onChangeRating = value => {
    setLocation(prevLocation =>
      prevLocation.includes(value)
        ? prevLocation.filter(r => r !== value)
        : [...prevLocation, value]
    )
  }

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const perPageData = 6
  const indexOfLast = currentPage * perPageData
  const indexOfFirst = indexOfLast - perPageData
  const currentdata = []
  // const currentdata = useMemo(() => products?.slice(indexOfFirst, indexOfLast), [products, indexOfFirst, indexOfLast])

  useEffect(() => {
    // setspaceList(currentdata);
  }, [currentdata])

  // search
  const handleSearch = ele => {
    // const query = ele.value.toLowerCase();
    // handleSearchData({ setState: setspaceList, data: products, item: query })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="공간 관리" breadcrumbItem="공간 목록" />
          <Row>
            <Col lg="3">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Filter</CardTitle>
                  <div>
                    <div className="mt-4">
                      <h5 className="font-size-14 mb-3">엘리스랩</h5>
                      <div>
                        <FormGroup check className="mt-2">
                          <Input
                            type="checkbox"
                            id="productratingCheck1"
                            onChange={e => {
                              onChangeRating("seoul")
                            }}
                          />
                          <Label check htmlFor="productratingCheck1">
                            서울센터
                          </Label>
                        </FormGroup>
                        <FormGroup check className="mt-2">
                          <Input
                            type="checkbox"
                            id="productratingCheck2"
                            onChange={e => {
                              onChangeRating("busan")
                            }}
                          />
                          <Label check htmlFor="productratingCheck2">
                            부산센터
                          </Label>
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-5 pb-3">
                      <h5 className="font-size-14 mb-3">공간 구분</h5>
                      <div>
                        <FormGroup check className="mt-2">
                          <Input
                            type="checkbox"
                            id="productratingCheck1"
                            onChange={e => {
                              onChangeRating("meeting")
                            }}
                          />
                          <Label check htmlFor="productratingCheck1">
                            미팅룸
                          </Label>
                        </FormGroup>
                        <FormGroup check className="mt-2">
                          <Input
                            type="checkbox"
                            id="productratingCheck2"
                            onChange={e => {
                              onChangeRating("programming")
                            }}
                          />
                          <Label check htmlFor="productratingCheck2">
                            프로그래밍 존
                          </Label>
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={9}>
              <Row className="mb-3">
                <Col xl={4} sm={6}>
                  <div className="mt-2">
                    <h5>공간</h5>
                  </div>
                </Col>
                <Col lg={8} sm={6}>
                  <Form className="mt-4 mt-sm-0 float-sm-end d-sm-flex align-items-center">
                    <div className="search-box me-2">
                      <div className="position-relative">
                        <Input
                          type="text"
                          className="form-control border-0"
                          placeholder="Search..."
                          onChange={e => handleSearch(e.target)}
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>
                    <Nav
                      className="product-view-nav justify-content-end mt-3 mt-sm-0"
                      pills
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => {
                            toggleTab("1")
                          }}
                        >
                          <i className="bx bx-grid-alt" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "2",
                          })}
                          onClick={() => {
                            toggleTab("2")
                          }}
                        >
                          <i className="bx bx-list-ul" />
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Form>
                </Col>
              </Row>
              {isLoading ? (
                <Spinners setLoading={setLoading} />
              ) : (
                <>
                  <Row>
                    {!isEmpty(spaceList) &&
                      (spaceList || [])?.map((space, key) => (
                        <Col xl={4} sm={6} key={"_col_" + key}>
                          <Card onClick={() => navigate(`/spaces/${space.id}`)}>
                            <CardBody>
                              <div className="space-img position-relative">
                                {space.isOffer ? (
                                  <div className="avatar-sm space-ribbon">
                                    <span className="avatar-title rounded-circle bg-primary">
                                      {`- ${space.offer} %`}
                                    </span>
                                  </div>
                                ) : null}

                                <img
                                  style={{ height: "200px" }}
                                  src={space.spaceImgs[0]}
                                  alt=""
                                  className="img-fluid mx-auto d-block"
                                />
                              </div>
                              <div className="mt-4 text-center">
                                <h5 className="mb-3 text-truncate">
                                  <Link
                                    to={"/ecommerce-space-detail/" + space.id}
                                    className="text-dark"
                                  >
                                    [{space.location}] {space.name}
                                  </Link>
                                </h5>
                                <h5 className="my-0">
                                  최대인원: {space.maxPeople}명
                                </h5>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                  <Paginations
                    perPageData={perPageData}
                    data={[]}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isShowingPageLength={false}
                    paginationDiv="col-lg-12"
                    paginationClass="pagination pagination-rounded justify-content-center mt-3 mb-4 pb-1"
                  />
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

SpaceList.propTypes = {
  products: PropTypes.array,
  onGetProducts: PropTypes.func,
}

export default withRouter(SpaceList)
