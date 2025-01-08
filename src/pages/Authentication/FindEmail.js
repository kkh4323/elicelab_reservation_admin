import PropTypes from "prop-types"
import React, { useState } from "react"
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom"
import withRouter from "components/Common/withRouter"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

// action
// import { userForgetPassword } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.svg"
import axios from "axios"

const FindEmail = props => {
  //meta title
  document.title = "비밀번호 재설정 | 엘리스랩"

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [formShow, setFormShow] = useState(true)
  const [email, setEmail] = useState("")

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: "",
      phone: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("이름을 입력해주세요"),
      phone: Yup.string().required("전화번호를 입력해주세요"),
    }),
    onSubmit: async values => {
      console.log(values)
      try {
        const { data, status } = await axios.post(
          "http://localhost/api/auth/find/email",
          values
        )

        if (status === 200) {
          setEmail(data.body)
          setFormShow(false)
        }
      } catch (err) {
        console.log(err.message)
      }
    },
  })

  // const ForgotPasswordProperties = createSelector(
  //   (state) => state.ForgetPassword,
  //   (forgetPassword) => ({
  //     forgetError: forgetPassword.forgetError,
  //     forgetSuccessMsg: forgetPassword.forgetSuccessMsg,
  //   })
  // );

  // const {
  //   forgetError,
  //   forgetSuccessMsg
  // } = useSelector(ForgotPasswordProperties);

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">이메일 찾기</h5>
                        <p>가입 시 입력한 이름과 전화번호를 입력해주세요.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    {/*{forgetError && forgetError ? (*/}
                    {/*  <Alert color="danger" style={{ marginTop: "13px" }}>*/}
                    {/*    {forgetError}*/}
                    {/*  </Alert>*/}
                    {/*) : null}*/}
                    {/*{forgetSuccessMsg ? (*/}
                    {/*  <Alert color="success" style={{ marginTop: "13px" }}>*/}
                    {/*    {forgetSuccessMsg}*/}
                    {/*  </Alert>*/}
                    {/*) : null}*/}

                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        formShow ? validation.handleSubmit() : navigate(-1)
                        return false
                      }}
                    >
                      {formShow ? (
                        <>
                          <div className="mb-3">
                            <Label className="form-label">이름</Label>
                            <Input
                              name="username"
                              className="form-control"
                              placeholder="이름을 입력해주세요"
                              type="text"
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
                            <Label className="form-label">전화번호</Label>
                            <Input
                              name="phone"
                              className="form-control"
                              placeholder="-을 제외하고 입력해주세요"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.phone || ""}
                              invalid={
                                validation.touched.phone &&
                                validation.errors.phone
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.phone &&
                            validation.errors.phone ? (
                              <FormFeedback type="invalid">
                                {validation.errors.phone}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </>
                      ) : (
                        <div className="m-3 pb-3">
                          <h3>가입된 이메일</h3>
                          <h1>{email}</h1>
                        </div>
                      )}
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                          >
                            {formShow ? "이메일 확인" : "로그인으로 이동"}
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go back to{" "}
                  <Link to="login" className="font-weight-medium text-primary">
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Skote. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

FindEmail.propTypes = {
  history: PropTypes.object,
}

export default withRouter(FindEmail)
