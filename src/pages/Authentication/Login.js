import PropTypes from "prop-types"
import React, { useState } from "react"

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import { Link, useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

// actions
import { loginUser, socialLogin } from "../../store/actions"

// import images
import profileImg from "../../assets/images/profile-img.png"
import logoImg from "../../assets/images/elice-logo.svg"
import axios from "axios"

const Login = props => {
  //meta title
  document.title = "로그인 | 엘리스랩"

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [errAlert, setErrAlert] = useState(false)

  // const validation = useFormik({
  //   // enableReinitialize : use this  flag when initial values needs to be changed
  //   enableReinitialize: true,
  //
  //   initialValues: {
  //     email: '',
  //     password: '',
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup.string().required("이메일을 입력해주세요."),
  //     password: Yup.string().required("비밀번호를 입력해주세요."),
  //   }),
  //   onSubmit: async (values) => {
  //     // dispatch(loginUser(values, props.router.navigate));
  //     try {
  //       const {data, status} = await axios.post('https://localhost/api/auth/login', values)
  //       if (status === 200) {
  //         console.log(data.accessToken)
  //         localStorage.setItem('accessToken', data.accessToken)
  //         localStorage.setItem("authUser", data.user)
  //         dispatch(loginUser(values, props.router.navigate))
  //         // navigate('/')
  //       }
  //     } catch (err) {
  //       console.log(err.message)
  //       if (err.response.status === 400) {
  //         setErrAlert(true)
  //       }
  //       console.log(err.message)
  //     }
  //   }
  // });
  const validation = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "admin@themesbrand.com" || "",
      password: "123456" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      dispatch(loginUser(values, props.router.navigate))
    },
  })

  const LoginProperties = createSelector(
    state => state.Login,
    login => ({
      error: login.error,
    })
  )

  const { error } = useSelector(LoginProperties)

  const signIn = type => {
    dispatch(socialLogin(type, props.router.navigate))
  }

  //for facebook and google authentication
  const socialResponse = type => {
    signIn(type)
  }

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">엘리스랩</h5>
                        <p>엘리스랩 로그인 화면입니다.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">이메일 주소</Label>
                        <Input
                          name="email"
                          className="form-control"
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
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
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

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          ID 저장
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          로그인
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <Link
                              to="#"
                              className="social-list-item bg-primary text-white border-primary"
                              onClick={e => {
                                e.preventDefault()
                                socialResponse("facebook")
                              }}
                            >
                              <i className="mdi mdi-facebook" />
                            </Link>
                          </li>
                          {/*<li className="list-inline-item">*/}
                          {/*  <TwitterLogin*/}
                          {/*    loginUrl={*/}
                          {/*      "http://localhost:4000/api/v1/auth/twitter"*/}
                          {/*    }*/}
                          {/*    onSuccess={this.twitterResponse}*/}
                          {/*    onFailure={this.onFailure}*/}
                          {/*    requestTokenUrl={*/}
                          {/*      "http://localhost:4000/api/v1/auth/twitter/revers"*/}
                          {/*    }*/}
                          {/*    showIcon={false}*/}
                          {/*    tag={"div"}*/}
                          {/*  >*/}
                          {/*    <a*/}
                          {/*      href=""*/}
                          {/*      className="social-list-item bg-info text-white border-info"*/}
                          {/*    >*/}
                          {/*      <i className="mdi mdi-twitter"/>*/}
                          {/*    </a>*/}
                          {/*  </TwitterLogin>*/}
                          {/*</li>*/}
                          <li className="list-inline-item">
                            <Link
                              to="#"
                              className="social-list-item bg-danger text-white border-danger"
                              onClick={e => {
                                e.preventDefault()
                                socialResponse("google")
                              }}
                            >
                              <i className="mdi mdi-google" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <Row>
                        <Col>
                          <div className="mt-4 text-center">
                            <Link to="/find-email" className="text-muted">
                              <i className="mdi mdi-lock me-1" />
                              이메일을 잊으셨나요?
                            </Link>
                          </div>
                        </Col>
                        <Col>
                          <div className="mt-4 text-center">
                            <Link to="/forgot-password" className="text-muted">
                              <i className="mdi mdi-lock me-1" />
                              비밀번호를 잊으셨나요?
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  아직 계정이 없으시다면?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    회원가입{" "}
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

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
