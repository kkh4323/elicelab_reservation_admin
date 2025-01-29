import React, { useEffect, useMemo, useState } from "react"
import {
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer } from "react-toastify"
import DeleteModal from "../../components/Common/DeleteModal"
import Spinners from "../../components/Common/Spinner"
import TableContainer from "../../components/Common/TableContainer"
import * as PropTypes from "prop-types"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import * as Yup from "yup"
import { useFormik } from "formik"

function PatternFormat(props) {
  return null
}

PatternFormat.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  format: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
}

function FlatPickr(props) {
  return null
}

FlatPickr.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  options: PropTypes.shape({ dateFormat: PropTypes.string }),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
}
const UserList = props => {
  document.title = "엘리스랩 사용자 목록"
  const [deleteModal, setDeleteModal] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [customers, setCustomers] = useState([])

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzZTk1OGFjNC01ZmM3LTQ0MGItOTRhYS0zZmI3MDg5MzkxYjgiLCJpYXQiOjE3Mzc1NDM5MzYsImV4cCI6MTczNzU0OTkzNn0.QHLm9smrLhHDJg8eZd6z_A7ZLSGf7dQbkFW9Bs51j68"

  const getUserList = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + `${accessToken}`,
        },
      }
      const { data, status } = await axios.get(
        "https://localhost/api/user",
        config
      )
      setCustomers(data.body.data)
      console.log(data.body.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  const getUserById = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + `${accessToken}`,
        },
      }
      const { data, status } = await axios.get(
        `https://localhost/api/user/${userId}`,
        config
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  const deleteUserById = async id => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + `${accessToken}`,
        },
      }
      const { data, status } = await axios.delete(
        `https://localhost/api/user/${id}`,
        config
      )
      if (status === 200) {
        alert("사용자가 삭제되었습니다.")
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: (user && user.username) || "",
      email: (user && user.email) || "",
      password: (user && user.password) || "",
      confirmPassword: (user && user.confirmPassword) || "",
      phone: (user && user.phone) || "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("이름을 입력해주세요"),
      email: Yup.string()
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "유효한 이메일 주소를 입력해주세요"
        )
        .required("이메일을 입력해주세요"),
      password: Yup.string().required("비밀번호를 입력해주세요"),
      confirmPassword:
        Yup.string().required("비밀번호를 한 번 더 입력해주세요"),
      phone: Yup.string().required("전화번호를 입력해주세요"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const { username, phone, profileImg } = values
        const userInput = {}
        validation.resetForm()
      } else {
        if (values.password !== values.confirmPassword) {
          return alert("패스워드가 일치하지 않습니다.")
        }
        const {
          email,
          username,
          phone,
          password,
          termOfUseElice = true,
          overTwenty = true,
          personalInfo = true,
          marketingAgree = false,
          etc = false,
        } = values
        const userInput = {
          email,
          password,
          username,
          phone,
          termOfUse: {
            termOfUseElice,
            overTwenty,
            personalInfo,
            marketingAgree,
            etc,
          },
        }
        const emailInput = { email }
        console.log(userInput)
        registerUser(userInput)
        validation.resetForm()
      }
      toggle()
    },
  })

  const getUserData = async (id, values) => {
    try {
      const { data, status } = await axios.put(
        `https://localhost/api/user/${id}`,
        values
      )
      if (status === 200) {
        alert(`${values.email}님의 정보가 수정되었습니다.`)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const registerUser = async values => {
    console.log("values: ", values)
    try {
      const { data, status } = await axios.post(
        "https://localhost/api/auth/signup",
        values
      )
      if (status === 201) {
        alert("사용자 등록이 완료되었습니다.")
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const updateUser = async values => {
    try {
      const { data, status } = await axios.put(
        "https://localhost/api/user",
        values
      )
      if (status === 200) {
        alert(`${values.email}님의 정보가 수정되었습니다.`)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getUserList()
  }, [customers])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const user = arg

    setUser({
      id: user.id,
      username: user.username,
      email: user.email,
      profileImg: user.profileImg,
      phone: user.phone,
    })
    setIsEdit(true)

    toggle()
  }

  const handleDeleteCustomer = () => {
    if (customer && customer.id) {
      // dispatch(onDeleteCustomer(customer.id));
      // setDeleteModal(false);
      // setCustomer(null)
    }
  }

  const handleUserClicks = () => {
    setUser("")
    toggle()
  }
  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
        cell: () => {
          return <input type="checkbox" className="form-check-input" />
        },
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "유저명",
        accessorKey: "username",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "이메일",
        accessorKey: "email",
        enableColumnFilter: false,
        enableSorting: true,
        cell: cell => {
          return (
            <>
              <p className="mb-0">{cell.row.original.email}</p>
            </>
          )
        },
      },
      {
        header: "전화번호",
        accessorKey: "phone",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "가입일자",
        accessorKey: "createdAt",
        enableColumnFilter: false,
        enableSorting: true,
        cell: cell => {
          const date = new Date(cell.row.original.createdAt)
          const formattedDate = date.toISOString().split("T")[0]
          return <p className="mb-0">{formattedDate}</p>
        },
      },
      {
        header: "가입경로",
        accessorKey: "provider",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "수정/삭제",
        enableColumnFilter: false,
        enableSorting: false,
        cell: cellProps => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="card-drop">
                <i className="mdi mdi-dots-horizontal font-size-18"></i>
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  onClick={e => {
                    e.preventDefault()
                    handleUserClicks()
                    setIsEdit(true)
                    console.log("isEdit: ", isEdit)
                    console.log("customers: ", cellProps.row.original.id)
                    return false
                  }}
                >
                  <i
                    className="mdi mdi-pencil font-size-16 text-success me-1"
                    id="edittooltip"
                  ></i>
                  정보 수정
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    정보 수정
                  </UncontrolledTooltip>
                </DropdownItem>

                <DropdownItem
                  onClick={e => {
                    // const userData = cellProps.row.original
                    // handleUserClick(userData)
                    e.preventDefault()
                    deleteUserById(cellProps.row.original.id)
                    return false
                  }}
                >
                  <i
                    className="mdi mdi-trash-can font-size-16 text-danger me-1"
                    id="deletetooltip"
                  ></i>
                  계정 삭제
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    계정 삭제
                  </UncontrolledTooltip>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )
        },
      },
    ],
    []
  )
  return (
    <React.Fragment>
      {/*<div className="page-content">*/}
      {/*  <Container fluid>*/}
      {/*    /!* Render Breadcrumb *!/*/}
      {/*    <Breadcrumbs title='사용자 목록' breadcrumbItem='사용자 관리' />*/}

      {/*  </Container>*/}
      {/*</div>*/}
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCustomer}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="사용자 관리" breadcrumbItem="사용자 목록" />
          <Row>
            {isLoading ? (
              <Spinners setLoading={setLoading} />
            ) : (
              <Col xs="12">
                <Card>
                  <CardBody>
                    <TableContainer
                      columns={columns}
                      data={customers}
                      isGlobalFilter={true}
                      isAddButton={true}
                      isPagination={true}
                      isCustomPageSize={true}
                      handleUserClick={handleUserClicks}
                      buttonClass="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2 addCustomers-modal"
                      buttonName="사용자 추가"
                      paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                      tableClass="align-middle table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                      theadClass="table-light"
                      pagination="pagination"
                      SearchPlaceholder="search..."
                    />
                  </CardBody>
                </Card>
              </Col>
            )}
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle} tag="h4">
                {!!isEdit ? "Edit User" : "Add User"}
              </ModalHeader>
              <ModalBody>
                <Form
                  onSubmit={e => {
                    e.preventDefault()
                    setIsEdit(false)
                    validation.handleSubmit()
                    return false
                  }}
                >
                  <Row>
                    <Col xs={12}>
                      <div className="mb-3">
                        <Label className="form-label">이름</Label>
                        <Input
                          name="username"
                          type="text"
                          placeholder="이름을 입력해주세요"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username &&
                            validation.errors.username
                              ? true
                              : false
                          }
                        />
                        {validation.touched.username &&
                        validation.errors.username ? (
                          <FormFeedback type="invalid">
                            {validation.errors.username}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">이메일</Label>
                        <Input
                          name="email"
                          label="email"
                          placeholder="이메일을 입력해주세요"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">비밀번호</Label>
                        <Input
                          name="password"
                          label="password"
                          type="password"
                          placeholder="비밀번호를 입력해주세요"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">비밀번호 확인</Label>
                        <Input
                          name="confirmPassword"
                          label="confirmPassword"
                          type="password"
                          placeholder="비밀번호를 입력해주세요"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.confirmPassword || ""}
                          invalid={
                            validation.touched.confirmPassword &&
                            validation.errors.confirmPassword
                              ? true
                              : false
                          }
                        />
                        {validation.touched.confirmPassword &&
                        validation.errors.confirmPassword ? (
                          <FormFeedback type="invalid">
                            {validation.errors.confirmPassword}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">전화번호</Label>
                        <Input
                          name="phone"
                          type="text"
                          placeholder="전화번호를 입력해주세요"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone || ""}
                          invalid={
                            validation.touched.phone && validation.errors.phone
                              ? true
                              : false
                          }
                        />
                        {validation.touched.phone && validation.errors.phone ? (
                          <FormFeedback type="invalid">
                            {validation.errors.phone}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="text-end">
                        <button
                          type="submit"
                          className="btn btn-success save-user"
                        >
                          추가하기
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
            </Modal>
          </Row>
          {/*<Modal isOpen={modal} toggle={toggle}>*/}
          {/*  <ModalHeader toggle={toggle} tag="h4">*/}
          {/*    {!!isEdit*/}
          {/*      ? "Edit Customer"*/}
          {/*      : "Add Customer"}*/}
          {/*  </ModalHeader>*/}
          {/*  <ModalBody>*/}
          {/*    <Form*/}
          {/*      onSubmit={(e) => {*/}
          {/*        e.preventDefault();*/}
          {/*        validation.handleSubmit();*/}
          {/*        return false;*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <Row>*/}
          {/*        <Col className="col-12">*/}
          {/*          <div className="mb-3">*/}
          {/*            <Label>UserName</Label>*/}
          {/*            <Input*/}
          {/*              name="username"*/}
          {/*              type="text"*/}
          {/*              placeholder="Insert User Name"*/}
          {/*              onChange={validation.handleChange}*/}
          {/*              onBlur={validation.handleBlur}*/}
          {/*              value={validation.values.username || ""}*/}
          {/*              invalid={*/}
          {/*                validation.touched.username && validation.errors.username ? true : false*/}
          {/*              }*/}
          {/*            />*/}
          {/*            {validation.touched.username && validation.errors.username ? (*/}
          {/*              <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>*/}
          {/*            ) : null}*/}
          {/*          </div>*/}

          {/*          <div className="mb-3">*/}
          {/*            <Label>Phone No</Label>*/}
          {/*            <PatternFormat*/}
          {/*              className="form-control"*/}
          {/*              name="phone"*/}
          {/*              placeholder="Insert Phone No"*/}
          {/*              value={validation.values.phone || ""}*/}
          {/*              onChange={validation.handleChange}*/}
          {/*              format="###-###-####"*/}
          {/*            />*/}

          {/*            {validation.touched.phone && validation.errors.phone ? (*/}
          {/*              <FormFeedback type="invalid" className="d-block">{validation.errors.phone}</FormFeedback>*/}
          {/*            ) : null}*/}
          {/*          </div>*/}

          {/*          <div className="mb-3">*/}
          {/*            <Label>Email Id</Label>*/}
          {/*            <Input*/}
          {/*              name="email"*/}
          {/*              type="email"*/}
          {/*              placeholder="Insert Email Id"*/}
          {/*              onChange={validation.handleChange}*/}
          {/*              onBlur={validation.handleBlur}*/}
          {/*              value={validation.values.email || ""}*/}
          {/*              invalid={*/}
          {/*                validation.touched.email && validation.errors.email ? true : false*/}
          {/*              }*/}
          {/*            />*/}
          {/*            {validation.touched.email && validation.errors.email ? (*/}
          {/*              <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>*/}
          {/*            ) : null}*/}
          {/*          </div>*/}

          {/*          <div className="mb-3">*/}
          {/*            <Label>Address</Label>*/}
          {/*            <Input*/}
          {/*              name="address"*/}
          {/*              type="textarea"*/}
          {/*              placeholder="Insert Address"*/}
          {/*              rows="3"*/}
          {/*              onChange={validation.handleChange}*/}
          {/*              onBlur={validation.handleBlur}*/}
          {/*              value={validation.values.address || ""}*/}
          {/*              invalid={*/}
          {/*                validation.touched.address && validation.errors.address ? true : false*/}
          {/*              }*/}
          {/*            />*/}
          {/*            {validation.touched.address && validation.errors.address ? (*/}
          {/*              <FormFeedback type="invalid">{validation.errors.address}</FormFeedback>*/}
          {/*            ) : null}*/}
          {/*          </div>*/}

          {/*          <div className="mb-3">*/}
          {/*            <Label>Rating</Label>*/}
          {/*            <Input*/}
          {/*              name="rating"*/}
          {/*              type="text"*/}
          {/*              placeholder="Insert Rating"*/}
          {/*              onChange={validation.handleChange}*/}
          {/*              onBlur={validation.handleBlur}*/}
          {/*              value={validation.values.rating || ""}*/}
          {/*              invalid={*/}
          {/*                validation.touched.rating && validation.errors.rating ? true : false*/}
          {/*              }*/}
          {/*            />*/}
          {/*            {validation.touched.rating && validation.errors.rating ? (*/}
          {/*              <FormFeedback type="invalid">{validation.errors.rating}</FormFeedback>*/}
          {/*            ) : null}*/}
          {/*          </div>*/}

          {/*          <div className="mb-3">*/}
          {/*            <Label>Wallet Balance</Label>*/}
          {/*            <Input*/}
          {/*              name="walletBalance"*/}
          {/*              type="text"*/}
          {/*              placeholder="Insert Wallet Balance"*/}
          {/*              onChange={validation.handleChange}*/}
          {/*              onBlur={validation.handleBlur}*/}
          {/*              value={validation.values.walletBalance || ""}*/}
          {/*              invalid={*/}
          {/*                validation.touched.walletBalance && validation.errors.walletBalance ? true : false*/}
          {/*              }*/}
          {/*            />*/}
          {/*            {validation.touched.walletBalance && validation.errors.walletBalance ? (*/}
          {/*              <FormFeedback type="invalid">{validation.errors.walletBalance}</FormFeedback>*/}
          {/*            ) : null}*/}
          {/*          </div>*/}

          {/*          <div className="mb-3">*/}
          {/*            <Label>Joining Date</Label>*/}
          {/*            <FlatPickr*/}
          {/*              className="form-control"*/}
          {/*              name="joiningDate"*/}
          {/*              placeholder="Select time"*/}
          {/*              value={validation.values.joiningDate || ""}*/}
          {/*              options={{*/}
          {/*                dateFormat: "d M, Y"*/}
          {/*              }}*/}
          {/*              onChange={(date) => validation.setFieldValue("joiningDate", moment(date[0]).format("DD MMM ,YYYY"))}*/}
          {/*            />*/}
          {/*            {validation.touched.joiningDate && validation.errors.joiningDate ? (*/}
          {/*              <FormFeedback type="invalid" className="d-block">{validation.errors.joiningDate}</FormFeedback>*/}
          {/*            ) : null}*/}
          {/*          </div>*/}
          {/*        </Col>*/}
          {/*      </Row>*/}
          {/*      <Row>*/}
          {/*        <Col>*/}
          {/*          <div className="text-end">*/}
          {/*            <Button color="success"*/}
          {/*                    type="submit"*/}
          {/*                    className="save-customer"*/}
          {/*            >*/}
          {/*              Save*/}
          {/*            </Button>*/}
          {/*          </div>*/}
          {/*        </Col>*/}
          {/*      </Row>*/}
          {/*    </Form>*/}
          {/*  </ModalBody>*/}
          {/*</Modal>*/}
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  )
}

export default UserList
