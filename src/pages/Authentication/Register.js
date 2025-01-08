import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

// action
import { registerUser, apiError } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"

import { Link, useNavigate } from "react-router-dom"

// import images
import profileImg from "../../assets/images/profile-img.png"
import logoImg from "../../assets/images/logo.svg"
import axios from "axios"

const Register = props => {
  //meta title
  document.title = "회원가입 | 엘리스랩"

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [submitBtnDisable, setSubmitBtnDisable] = useState(true)
  const [verifyCodeShow, setVerifyCodeShow] = useState(false)

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
      termOfUseElice: false,
      overTwenty: false,
      personalInfo: false,
      marketingAgree: false,
      etc: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("이메일을 입력해주세요."),
      username: Yup.string().required("이름을 입력해주세요."),
      phone: Yup.string().required("전화번호를 입력해주세요."),
      password: Yup.string().required("비밀번호를 입력해주세요."),
      confirmPassword: Yup.string().required(
        "비밀번호를 한 번 더 입력해주세요."
      ),
      termOfUseElice: Yup.boolean().oneOf(
        [true],
        "이용약관은 필수 동의사항입니다."
      ),
      overTwenty: Yup.boolean().oneOf(
        [true],
        "회원가입은 만 19세 이상만 가능합니다."
      ),
      personalInfo: Yup.boolean().oneOf(
        [true],
        "개인정보정책은 필수 동의사항입니다."
      ),
      marketingAgree: Yup.boolean(),
      etc: Yup.boolean(),
    }),
    onSubmit: values => {
      // dispatch(registerUser(values));
      if (values.password !== values.confirmPassword) {
        return alert("패스워드가 일치하지 않습니다.")
      }
      const {
        email,
        username,
        phone,
        password,
        termOfUseElice,
        overTwenty,
        personalInfo,
        marketingAgree,
        etc,
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
      console.log(userInput)
      registerUser(userInput)
    },
  })

  const registerUser = async values => {
    try {
      const { data, status } = await axios.post(
        "https://localhost/api/auth/signup",
        values
      )
      if (status === 201) {
        navigate("/login")
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const sendEmail = async e => {
    e.preventDefault()

    const userInput = { email }
    try {
      const url = "http://localhost/api/auth/email/send"
      const result = await axios.post(url, userInput)
      console.log("+++++++++++++++++", result)
      if (result.status === 201) {
        setVerifyCodeShow(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const checkVerifyingCode = async e => {
    e.preventDefault()

    const userInput = {
      email,
      code: verifyingCode,
    }
    try {
      const url = "http://localhost/api/auth/email/verify"
      const result = await axios.post(url, userInput)
      console.log(result)
      if (result.status === 201) {
        setVerifyCodeShow(false)
        setSubmitBtnDisable(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const AccountProperties = createSelector(
    state => state.Account,
    account => ({
      user: account.user,
      registrationError: account.registrationError,
      success: account.success,
      // loading: account.loading,
    })
  )

  const {
    user,
    registrationError,
    success,
    // loading
  } = useSelector(AccountProperties)

  useEffect(() => {
    dispatch(apiError(""))
  }, [])

  useEffect(() => {
    success && setTimeout(() => navigate("/login"), 2000)
  }, [success])

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
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">엘리스랩 회원가입</h5>
                        <p>간단한 정보로 회원가입하세요.</p>
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
                      {user && user ? (
                        <Alert color="success">
                          회원가입이 완료되었습니다.
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label">이름</Label>
                        <Input
                          name="username"
                          type="text"
                          placeholder="성,이름을 정확히 입력해주세요"
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
                        <Label className="form-label">이메일 주소</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="이메일 주소를 입력해주세요"
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
                        <button
                          className="btn btn-secondary mt-2"
                          onClick={sendEmail}
                          disabled={!validation.values.email}
                        >
                          가입 인증 메일 전송
                        </button>
                      </div>

                      {verifyCodeShow && (
                        <div className="mb-3">
                          <Label className="form-label">인증 코드</Label>
                          <Input
                            id="verifyingCode"
                            name="verifyingCode"
                            type="text"
                            placeholder="인증 코드를 입력해주세요"
                            value={verifyingCode || ""}
                            onChange={e => setVerifyingCode(e.target.value)}
                          />
                          <button
                            className="btn btn-secondary mt-2"
                            onClick={checkVerifyingCode}
                            disabled={!verifyingCode}
                          >
                            인증하기
                          </button>
                        </div>
                      )}

                      <div className="mb-3">
                        <Label className="form-label">전화번호</Label>
                        <Input
                          name="phone"
                          type="phone"
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

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
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
                        <Label className="form-label">Confirm Password</Label>
                        <Input
                          name="confirmPassword"
                          type="password"
                          placeholder="비밀번호를 한 번 더 입력해주세요"
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
                        <Label className="form-label">약관 동의</Label>
                        <div className="form-check">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="selectAll"
                            onChange={e => {
                              const checked = e.target.checked
                              validation.setFieldValue(
                                "termOfUseElice",
                                checked
                              )
                              validation.setFieldValue("overTwenty", checked)
                              validation.setFieldValue("personalInfo", checked)
                              validation.setFieldValue(
                                "marketingAgree",
                                checked
                              )
                              validation.setFieldValue("etc", checked)
                            }}
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="selectAll"
                          >
                            전체 동의
                          </Label>
                        </div>
                        <div className="form-check">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="termOfUseElice"
                            name="termOfUseElice"
                            checked={validation.values.termOfUseElice}
                            onChange={validation.handleChange}
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="termOfUseElice"
                          >
                            이용약관 동의 (필수)
                          </Label>
                        </div>

                        <div className="form-check">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="overTwenty"
                            name="overTwenty"
                            checked={validation.values.overTwenty}
                            onChange={validation.handleChange}
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="overTwenty"
                          >
                            만 20세 이상 확인 (필수)
                          </Label>
                        </div>

                        <div className="form-check">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="personalInfo"
                            name="personalInfo"
                            checked={validation.values.personalInfo}
                            onChange={validation.handleChange}
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="personalInfo"
                          >
                            개인정보 수집 동의 (필수)
                          </Label>
                        </div>

                        <div className="form-check">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="marketingAgree"
                            name="marketingAgree"
                            checked={validation.values.marketingAgree}
                            onChange={validation.handleChange}
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="marketingAgree"
                          >
                            마케팅 수신 동의 (선택)
                          </Label>
                        </div>

                        <div className="form-check">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="etc"
                            name="etc"
                            checked={validation.values.etc}
                            onChange={validation.handleChange}
                          />
                          <Label className="form-check-label" htmlFor="etc">
                            기타 항목 동의 (선택)
                          </Label>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          // disabled={submitBtnDisable}
                        >
                          Register
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the Skote{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  이미 계정이 있으시다면?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    로그인
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Elice. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Kangho Kim
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Register
