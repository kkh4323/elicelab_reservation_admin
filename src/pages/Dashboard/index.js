import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Button, Card, CardBody, CardTitle, Container, Table } from "reactstrap"
import { useUsers } from "../../hooks/useUser"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import { userSearchOptions } from "../../common/data"

const Dashboard = props => {
  //meta title
  const [order, setOrder] = useState("ASC")
  const [page, setPage] = useState(1)
  const [take, setTake] = useState(10)
  const [searchFilter, setSearchFilter] = useState("")
  const [keyword, setKeyword] = useState("")
  const [queryParams, setQueryParams] = useState({
    order,
    page,
    take,
    searchFilter,
    keyword,
  })
  document.title = "Dashboard | Skote - React Admin & Dashboard Template"
  const { data, error, isPending, isError, refetch } = useUsers(queryParams)
  console.log("data: ", data)
  console.log("error: ", error)
  useEffect(() => {
    console.log(queryParams)
    refetch()
  }, [queryParams])
  const handleSearch = () => {
    setQueryParams({ order, page, take, searchFilter, keyword })
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />
        </Container>
      </div>
      <Card>
        <CardBody>
          <CardTitle className="h4">Basic example</CardTitle>
          <p className="card-title-desc">
            For basic styling—light padding and only horizontal dividers—add the
            base className <code>.table</code> to any
            <code>&lt;table&gt;</code>.
          </p>

          <div className="table-responsive">
            <Table className="table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((user, index) => (
                    <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <label
            htmlFor="example-order-input"
            className="col-md-2 col-form-label"
          >
            Order
          </label>
          <select
            className="form-select mb-2"
            value={order}
            onChange={e => {
              setOrder(e.target.value)
            }}
          >
            <option value={"ASC"}>오름차순</option>
            <option value={"DESC"}>내림차순</option>
          </select>
          <label
            htmlFor="example-number-input"
            className="col-md-2 col-form-label"
          >
            Take
          </label>
          <div className="col-md-10">
            <input
              className="form-control"
              type="number"
              defaultValue=""
              onChange={e => {
                setTake(Number(e.target.value))
              }}
              value={take}
              id="example-number-input"
            />
          </div>
          <label
            htmlFor="example-page-input"
            className="col-md-2 col-form-label"
          >
            Page
          </label>
          <div className="col-md-10">
            <input
              className="form-control"
              type="number"
              defaultValue=""
              onChange={e => {
                setPage(Number(e.target.value))
              }}
              value={page}
              id="example-page-input"
            />
          </div>
          <label
            htmlFor="example-search-filter-input"
            className="col-md-2 col-form-label"
          >
            SearchFilter
          </label>
          <select
            className="form-select mb-2"
            value={searchFilter}
            onChange={e => {
              const newSearchFilter = e.target.value
              setSearchFilter(newSearchFilter)
            }}
          >
            {userSearchOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <label
            htmlFor="example-page-input"
            className="col-md-2 col-form-label"
          >
            Keyword
          </label>
          <div className="col-md-10">
            <input
              className="form-control"
              type="string"
              defaultValue=""
              onChange={e => {
                const newKeyword = e.target.value
                setKeyword(newKeyword)
              }}
              value={keyword}
              id="example-page-input"
            />
          </div>
          <Button color="primary" onClick={handleSearch}>
            검색
          </Button>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
