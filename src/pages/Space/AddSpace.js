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
  Button,
} from "reactstrap"

import Breadcrumbs from "components/Common/Breadcrumb"

import Dropzone from "react-dropzone"
import { useFormik } from "formik"
import * as yup from "yup"
import axios from "axios"
// import { Editor } from "@tinymce/tinymce-react"

const AddSpace = () => {
  //meta title
  document.title = "엘리스랩 공간 등록"

  const navigate = useNavigate()
  const [selectedFiles, setselectedFiles] = useState([])
  const [spaceImgs, setSpaceImgs] = useState([])

  const validation = useFormik({
    initialValues: {
      name: "",
      description: "",
      location: "",
      zone: "",
      maxPeople: 0,
      spaceImgs: [],
    },
    validationSchema: yup.object({
      name: yup.string().required("공간명은 필수값입니다."),
      description: yup.string().required("상세 설명은 필수값입니다."),
      location: yup.string().required("센터 선택은 필수값입니다."),
      zone: yup.string().required("공간 구분은 필수값입니다."),
      maxPeople: yup.number().required("최대 인원은 필수값입니다."),
      spaceImgs: yup
        .array()
        .required("최소 한 장의 공간 이미지를 업로드해야 합니다."),
    }),

    onSubmit: async values => {
      console.log("+++++++++++++++++", values)
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("description", values.description)
      formData.append("location", values.location)
      formData.append("zone", values.zone)
      formData.append("maxPeople", values.maxPeople)
      spaceImgs.forEach(file => {
        formData.append("spaceImgs", file)
      })

      try {
        const response = await axios.post(
          "https://localhost/api/space/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        if (response.status === 201) {
          navigate("/spaces")
        }
      } catch (err) {
        console.log("공간 생성 실패: ", err)
      }
      // formData.append('spaceImgs', values.spaceImgs)
    },
  })

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
  }

  useEffect(() => {
    console.log(validation.errors)
  }, [validation.errors])

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="공간 관리" breadcrumbItem="공간 생성" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle className="h5">공간 생성</CardTitle>
                  <p className="card-title-desc">
                    엘리스랩 미팅룸, 프로그래밍 존 등 공간 생성입니다.
                  </p>

                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <Row>
                      <Col md={8}>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="floatingemailInput"
                            placeholder="공간명"
                            value={validation.values.name}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          />
                          <label htmlFor="floatingemailInput">공간명</label>
                          {validation.errors.name && validation.touched.name ? (
                            <span className="text-danger">
                              {validation.errors.name}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="form-floating mb-3">
                          <select
                            className="form-select"
                            name="maxPeople"
                            value={validation.values.maxPeople}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          >
                            <option defaultValue={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                          </select>
                          <label htmlFor="floatingSelectGrid">
                            최대 수용 인원
                          </label>
                          <div>
                            {validation.errors.maxPeople &&
                            validation.touched.maxPeople ? (
                              <span className="text-danger">
                                {validation.errors.maxPeople}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <div className="form-floating mb-3">
                          <select
                            className="form-select"
                            name="location"
                            value={validation.values.location}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          >
                            <option defaultValue="0">선택해주세요.</option>
                            <option value="seoul">서울</option>
                            <option value="busan">부산</option>
                          </select>
                          <label htmlFor="floatingSelectGrid">
                            엘리스랩 센터 선택
                          </label>
                          <div>
                            {validation.errors.location &&
                            validation.touched.location ? (
                              <span className="text-danger">
                                {validation.errors.location}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="form-floating mb-3">
                          <select
                            className="form-select"
                            name="zone"
                            value={validation.values.zone}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          >
                            <option defaultValue="0">선택해주세요</option>
                            <option value="meeting">미팅룸</option>
                            <option value="programming">프로그래밍 존</option>
                          </select>
                          <label htmlFor="floatingSelectGrid">
                            공간 유형 구분
                          </label>
                          <div>
                            {validation.errors.zone &&
                            validation.touched.zone ? (
                              <span className="text-danger">
                                {validation.errors.zone}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            name="description"
                            className="form-control"
                            id="floatingemailInput"
                            placeholder="공간 상세 설명"
                            value={validation.values.description}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          />
                          <label htmlFor="floatingemailInput">
                            공간 상세 설명
                          </label>
                          {validation.errors.description &&
                          validation.touched.description ? (
                            <span className="text-danger">
                              {validation.errors.description}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    {/*<Row>*/}
                    {/*  <Col xs={12}>*/}
                    {/*    <Label htmlFor="formrow-firstname-Input">*/}
                    {/*      공간 상세 설명*/}
                    {/*    </Label>*/}
                    {/*    <textarea name="description"></textarea>*/}
                    {/*    <Editor*/}
                    {/*      // apiKey='your-api-key'*/}
                    {/*      // onInit={(evt, edit or) => editorRef.current = editor}*/}
                    {/*      initialValue=""*/}
                    {/*      init={{*/}
                    {/*        height: 350,*/}
                    {/*        menubar: true,*/}
                    {/*        plugins: [*/}
                    {/*          "advlist",*/}
                    {/*          "autolink",*/}
                    {/*          "lists",*/}
                    {/*          "link",*/}
                    {/*          "image",*/}
                    {/*          "charmap",*/}
                    {/*          "preview",*/}
                    {/*          "anchor",*/}
                    {/*          "searchreplace",*/}
                    {/*          "visualblocks",*/}
                    {/*          "code",*/}
                    {/*          "fullscreen",*/}
                    {/*          "insertdatetime",*/}
                    {/*          "media",*/}
                    {/*          "table",*/}
                    {/*          "code",*/}
                    {/*          "help",*/}
                    {/*          "wordcount",*/}
                    {/*        ],*/}
                    {/*        toolbar:*/}
                    {/*          "undo redo | blocks | " +*/}
                    {/*          "bold italic forecolor | alignleft aligncenter " +*/}
                    {/*          "alignright alignjustify | bullist numlist outdent indent | " +*/}
                    {/*          "removeformat | help",*/}
                    {/*        content_style:*/}
                    {/*          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",*/}
                    {/*      }}*/}
                    {/*    />*/}
                    {/*  </Col>*/}
                    {/*</Row>*/}
                    <Row className={"p-3 mt-4"}>
                      <Label htmlFor="formrow-firstname-Input">
                        공간 이미지 등록(최대 5장)
                      </Label>
                      <Dropzone
                        onDrop={acceptedFiles => {
                          handleAcceptedFiles(acceptedFiles)
                          setSpaceImgs(acceptedFiles)
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone">
                            <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              <div className="dz-message needsclick">
                                <div className="mb-3">
                                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                                </div>
                                <h4>Drop files here or click to upload.</h4>
                              </div>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div
                        className="dropzone-previews mt-3"
                        id="file-previews"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(5, 1fr)",
                          gap: "10px",
                        }}
                      >
                        {selectedFiles.map((f, i) => (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                            style={{ width: "100%" }}
                          >
                            <div className="p-2">
                              <div className="text-center">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={f.name}
                                  src={
                                    f.preview ||
                                    "https://via.placeholder.com/80x80?text=DICOM"
                                  }
                                  style={{
                                    objectFit: "cover",
                                    width: "100%",
                                  }}
                                />
                              </div>
                              <div className="text-center mt-2">
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                  style={{ fontSize: "10px" }}
                                >
                                  {f.name && f.name.length > 10
                                    ? f.name.substring(0, 30) + "..."
                                    : f.name || "Unnamed"}
                                </Link>
                                <p
                                  className="mb-0"
                                  style={{ fontSize: "12px" }}
                                >
                                  <strong>{f.formattedSize || "0 KB"}</strong>
                                </p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </Row>
                    <div className="d-flex flex-wrap gap-2">
                      <Button
                        type="submit"
                        color="primary"
                        className="btn btn-primary waves-effect waves-light"
                      >
                        등록하기
                      </Button>
                      {/*<Button*/}
                      {/*  // type="submit"*/}
                      {/*  color="secondary"*/}
                      {/*  className="btn btn-secondary waves-effect waves-light"*/}
                      {/*>*/}
                      {/*  임시저장*/}
                      {/*</Button>*/}
                      {/*<Button*/}
                      {/*  // type="submit"*/}
                      {/*  color="danger"*/}
                      {/*  className="btn btn-danger waves-effect waves-light"*/}
                      {/*>*/}
                      {/*  취소하기*/}
                      {/*</Button>*/}
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(AddSpace)
