import React, { useEffect, useMemo, useState } from "react"
import {
  Button,
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
import UserTableContainer from "../../components/Common/UserTableContainer"
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
  const [alertModal, setAlertModal] = useState(false)
  const [alertModalTitle, setAlertModalTitle] = useState("")
  const [alertModalMessage, setAlertModalMessage] = useState("")
  const [roles, setRoles] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [searchType, setSearchType] = useState("")
  const [searchKeyword, setSearchKeyword] = useState("")
  const [filteredUsers, setFilteredUsers] = useState([])
  const [profileImage, setProfileImage] = useState(null)
  const [user, setUser] = useState(null)
  const [customers, setCustomers] = useState([])

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzZTk1OGFjNC01ZmM3LTQ0MGItOTRhYS0zZmI3MDg5MzkxYjgiLCJpYXQiOjE3MzkzNTU3MjYsImV4cCI6MTczOTM2MTcyNn0.aKGKmUPAQlGqvlzhu1jTNLRg1ZZVt32w0FFoEdn_FHs"

  const url = (roles = [], searchOption = "", searchKeyword = "") => {
    const baseUrl = "https://localhost/api/user"
    const params = new URLSearchParams()

    if (roles.length > 0) {
      params.append("roles", roles.join(","))
    }

    if (searchOption && searchKeyword) {
      params.append(searchOption, searchKeyword)
    }

    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl
  }

  const getUserList = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + `${accessToken}`,
        },
      }
      const { data, status } = await axios.get(
        url(roles, searchType, searchKeyword),
        config
      )
      setCustomers(data.body.data)
      setFilteredUsers(data.body.data)
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
        showAlertModal("삭제 완료", "사용자가 정상적으로 삭제되었습니다.")
        getUserList()
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const validation = useFormik({
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
        registerUser(userInput)
        validation.resetForm()
      }
      toggle()
    },
  })

  const updateUser = async (id, values) => {
    const userInput = {
      username: values.username,
      phone: values.phone,
    }

    try {
      const config = {
        headers: {
          Authorization: "Bearer " + `${accessToken}`,
        },
      }
      const { data, status } = await axios.put(
        `https://localhost/api/user/${id}`,
        userInput,
        config
      )
      if (status === 200) {
        showAlertModal(
          "수정 완료",
          `${values.email}님의 정보가 수정되었습니다.`
        )
        getUserList()
        setModal(!modal)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const registerUser = async values => {
    try {
      setLoading(!isLoading)
      const { data, status } = await axios.post(
        "https://localhost/api/auth/signup",
        values
      )
      if (status === 201) {
        setLoading(!isLoading)
        showAlertModal("등록 완료", "사용자 등록이 완료되었습니다.")
        getUserList()
      }
    } catch (err) {
      setLoading(!isLoading)
      console.log(err.message)
    }
  }

  useEffect(() => {
    getUserList()
  }, [roles])

  // 🔹 검색어 입력 시 필터링
  useEffect(() => {
    if (!searchKeyword) {
      setFilteredUsers(customers) // 검색어가 없을 경우 전체 데이터 표시
      return
    }

    const filtered = customers.filter(user => {
      const lowerKeyword = searchKeyword.toLowerCase()
      if (searchType === "이름")
        return user.username.toLowerCase().includes(lowerKeyword)
      if (searchType === "이메일")
        return user.email.toLowerCase().includes(lowerKeyword)
      if (searchType === "전화번호") return user.phone.includes(searchKeyword)
      return false
    })

    setFilteredUsers(filtered)
  }, [searchKeyword, searchType, customers])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = user => {
    setIsEdit(true)
    setUser(user)
    validation.setValues({
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
      profileImg: user.profileImg || "",
    })
    toggle()
  }

  const showAlertModal = (title, message) => {
    setAlertModalTitle(title)
    setAlertModalMessage(message)
    setAlertModal(true)
  }

  const closeAlertModal = () => {
    setAlertModal(false)
  }

  const handleImageUpload = event => {
    const file = event.target.files[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setProfileImage({ file, preview: previewUrl }) // 🔹 이미지 미리보기 저장
    }
  }

  const handleUserClicks = () => {
    setIsEdit(false)
    setUser(null)
    validation.resetForm()
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
        header: "이름",
        accessorKey: "username",
        enableColumnFilter: false,
        enableSorting: true,
        cell: cell => {
          const { profileImg, username } = cell.row.original
          const defaultImg =
            "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg" // 기본 이미지 설정

          return (
            <div className="d-flex align-items-center">
              <img
                src={profileImg || defaultImg}
                alt="프로필 이미지"
                className="rounded-circle me-2"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                onError={e => {
                  e.target.onerror = null
                  e.target.src = defaultImg
                }}
              />
              <span>{username}</span>
            </div>
          )
        },
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
                  onClick={() => handleUserClick(cellProps.row.original)}
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
      {isLoading && <Spinners setLoading={setLoading} />}
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
                    <UserTableContainer
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
                      roles={roles}
                      setRoles={setRoles}
                      name={name}
                      setName={setName}
                      email={email}
                      setEmail={setEmail}
                      phone={phone}
                      setPhone={setPhone}
                      searchType={searchType}
                      setSearchType={setSearchType}
                      searchKeyword={searchKeyword}
                      setSearchKeyword={setSearchKeyword}
                      filteredUsers={filteredUsers} // 필터링된 사용자 목록 전달
                      searchFunc={() => getUserList()}
                    />
                  </CardBody>
                </Card>
              </Col>
            )}
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle} tag="h4">
                {!!isEdit ? "정보 수정" : "사용자 추가"}
              </ModalHeader>
              <ModalBody>
                <Form
                  onSubmit={e => {
                    e.preventDefault()
                    {
                      !!isEdit
                        ? updateUser(user.id, validation.values)
                        : validation.handleSubmit()
                    }
                    return false
                  }}
                >
                  <Row>
                    <Col xs={12}>
                      {isEdit && (
                        <div className="mt-4 mt-md-0 text-center">
                          <input
                            type="file"
                            accept="image/*"
                            id="profileImg"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                          />
                          <img
                            className="img-thumbnail rounded-circle avatar-xl"
                            alt="200x200"
                            src={
                              profileImage?.preview ||
                              user?.profileImg ||
                              "https://via.placeholder.com/200"
                            }
                            onClick={() =>
                              document
                                .getElementById("profileImageInput")
                                .click()
                            } // 🔹 클릭 시 파일 업로드
                            style={{
                              cursor: "pointer",
                              objectFit: "cover",
                              width: "160px",
                              height: "160px",
                            }}
                            onError={e => {
                              e.target.onerror = null
                              e.target.src = "https://via.placeholder.com/200"
                            }}
                          />
                        </div>
                      )}
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
                      {!isEdit && (
                        <>
                          <div className="mb-3">
                            <Label className="form-label">비밀번호</Label>
                            <Input
                              name="password"
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
                        </>
                      )}
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
                          {!!isEdit ? "수정하기" : "추가하기"}
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
            </Modal>
          </Row>
        </Container>
      </div>
      <ToastContainer />
      <Modal isOpen={alertModal} toggle={closeAlertModal} backdrop="static">
        <ModalHeader toggle={closeAlertModal}>
          {alertModalTitle || "알림"}
        </ModalHeader>
        <ModalBody>
          <p>{alertModalMessage || "내용이 없습니다."}</p>
          <div className="text-end">
            <Button color="primary" onClick={closeAlertModal}>
              확인
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default UserList
