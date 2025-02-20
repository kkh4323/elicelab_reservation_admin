import PropTypes from "prop-types"
import React from "react"
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
// import { useSelector, useDispatch } from "react-redux"
// import { createSelector } from "reselect"
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

const ChangePassword = props => {
  //meta title
  document.title = "비밀번호 재설정 | 엘리스랩"

  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const token = searchParams.get("token")

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("새 비밀번호를 입력해주세요"),
      confirmPassword: Yup.string().required(
        "새 비밀번호를 한 번 더 입력해주세요"
      ),
    }),
    onSubmit: async values => {
      // dispatch(userForgetPassword(values, props.history));
      console.log(values)
      const { newPassword, confirmPassword } = values
      if (newPassword !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.")
        window.location.reload()
      }
      const userInput = { newPassword, token }
      try {
        const { data, status } = await axios.post(
          "http://localhost/api/auth/change/password/before",
          userInput
        )
        if (status === 200) {
          alert("비밀번호가 변경되었습니다.")
          navigate("/login")
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
                        <h5 className="text-primary">비밀번호 재설정</h5>
                        <p>새 비밀번호를 입력해주세요.</p>
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
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">새 비밀번호</Label>
                        <Input
                          name="newPassword"
                          className="form-control"
                          placeholder="비밀번호를 입력해주세요"
                          type="password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.newPassword || ""}
                          invalid={
                            validation.touched.newPassword &&
                            validation.errors.newPassword
                              ? true
                              : false
                          }
                        />
                        {validation.touched.newPassword &&
                        validation.errors.newPassword ? (
                          <FormFeedback type="invalid">
                            {validation.errors.newPassword}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">새 비밀번호 확인</Label>
                        <Input
                          name="confirmPassword"
                          className="form-control"
                          placeholder="비밀번호를 한 번 더 입력해주세요"
                          type="password"
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
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                          >
                            확인
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

ChangePassword.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ChangePassword)
