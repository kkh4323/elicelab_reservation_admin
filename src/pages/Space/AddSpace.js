import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import withRouter from "components/Common/withRouter";
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
  FormFeedback, Button
} from "reactstrap"
import classnames from "classnames";
import { isEmpty } from "lodash";

//Import Star Ratings
// import StarRatings from "react-star-ratings";

// RangeSlider
// import Nouislider from "nouislider-react";
// import "nouislider/distribute/nouislider.css";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

//Import data
// import { discountData, productsData } from "common/data";

//Import actions
// import { getProducts as onGetProducts } from "store/e-commerce/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { handleSearchData } from "components/Common/searchFile";
import Paginations from "components/Common/Pagination";
import Spinners from "components/Common/Spinner";
import Select from "react-select/base"
import Dropzone from "react-dropzone"
import { useFormik } from "formik"
import * as yup from "yup";
import { Editor } from '@tinymce/tinymce-react';

const AddSpace = () => {

  //meta title
  document.title = "엘리스랩 공간 등록";

  const navigate = useNavigate();
  const [selectedFiles, setselectedFiles] = useState([])

  const floatingformik = useFormik({
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
      spaceImgs: yup.array().required("최소 한 장의 공간 이미지를 업로드해야 합니다.")
    }),

    onSubmit: (values) => {
      // console.log("value", values.password);
      console.log("+++++++++++++++++", values)
    },
  });

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
                  <p className="card-title-desc">엘리스랩 미팅룸, 프로그래밍 존 등 공간 생성입니다.</p>

                  <Form onSubmit={floatingformik.handleSubmit}>
                    <Row>
                      <Col md={8}>
                        <div className="form-floating mb-3">
                          <input type="text" name="title" className="form-control" id="floatingemailInput" placeholder="공간명"
                                 value={floatingformik.values.email}
                                 onChange={floatingformik.handleChange}
                                 onBlur={floatingformik.handleBlur}
                          />
                          <label htmlFor="floatingemailInput">공간명</label>
                          {
                            floatingformik.errors.name && floatingformik.touched.name ? (
                              <span className="text-danger">{floatingformik.errors.name}</span>
                            ) : null
                          }
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="form-floating mb-3">
                          <select className="form-select" name="maxPeople"
                                  value={floatingformik.values.maxPeople}
                                  onChange={floatingformik.handleChange}
                                  onBlur={floatingformik.handleBlur}>
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
                          <label htmlFor="floatingSelectGrid">최대 수용 인원</label>
                          <div>
                          {
                              floatingformik.errors.maxPeople && floatingformik.touched.maxPeople ? (
                                <span className="text-danger">{floatingformik.errors.maxPeople}</span>
                              ) : null
                            }
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <div className="form-floating mb-3">
                          <select className="form-select" name="location"
                                  value={floatingformik.values.location}
                                  onChange={floatingformik.handleChange}
                                  onBlur={floatingformik.handleBlur}>
                            <option defaultValue="0">선택해주세요.</option>
                            <option value="1">서울</option>
                            <option value="2">부산</option>
                          </select>
                          <label htmlFor="floatingSelectGrid">엘리스랩 센터 선택</label>
                          <div>
                            {
                              floatingformik.errors.location && floatingformik.touched.location ? (
                                <span className="text-danger">{floatingformik.errors.location}</span>
                              ) : null
                            }
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="form-floating mb-3">
                          <select className="form-select" name="zone"
                                  value={floatingformik.values.zone}
                                  onChange={floatingformik.handleChange}
                                  onBlur={floatingformik.handleBlur}>
                            <option defaultValue="0">선택해주세요</option>
                            <option value="1">미팅룸</option>
                            <option value="2">프로그래밍 존</option>
                          </select>
                          <label htmlFor="floatingSelectGrid">공간 유형 구분</label>
                          <div>
                            {
                              floatingformik.errors.zone && floatingformik.touched.zone ? (
                                <span className="text-danger">{floatingformik.errors.zone}</span>
                              ) : null
                            }
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <Label htmlFor="formrow-firstname-Input">공간 상세 설명</Label>
                        <Editor
                          // apiKey='your-api-key'
                          // onInit={(evt, edit or) => editorRef.current = editor}
                          initialValue=""
                          init={{
                            height: 350,
                            menubar: true,
                            plugins: [
                              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                              'bold italic forecolor | alignleft aligncenter ' +
                              'alignright alignjustify | bullist numlist outdent indent | ' +
                              'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className={"p-3 mt-4"}>
                      <Label htmlFor="formrow-firstname-Input">공간 이미지 등록(최대 5장)</Label>
                    <Dropzone
                      onDrop={acceptedFiles => {
                        handleAcceptedFiles(acceptedFiles)
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
                    <ul className="list-unstyled mb-0" id="file-previews">
                      {(selectedFiles || [])?.map((file, index) => {
                        return (
                          <li className="mt-2 dz-image-preview" key=''>
                            <div className="border rounded">
                              <div className="d-flex flex-wrap gap-2 p-2">
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar-sm bg-light rounded p-2">
                                    <img data-dz-thumbnail="" className="img-fluid rounded d-block" src={file.preview} alt={file.name} />
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <div className="pt-1">
                                    <h5 className="fs-md mb-1" data-dz-name>{file.path}</h5>
                                    <strong className="error text-danger" data-dz-errormessage></strong>
                                  </div>
                                </div>
                                <div className="flex-shrink-0 ms-3">
                                  <Button variant="danger" size="sm"
                                          onClick={() => {
                                            const newImages = [...selectedFiles];
                                            newImages.splice(index, 1);
                                            setselectedFiles(newImages);
                                          }}>
                                    Delete</Button>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                    </Row>
                    <div className="d-flex flex-wrap gap-2">
                      <Button type="submit" color="primary" className="btn btn-primary waves-effect waves-light">등록하기</Button>
                      <Button type="submit" color="secondary"
                              className="btn btn-secondary waves-effect waves-light">임시저장</Button>
                      <Button type="submit" color="danger" className="btn btn-danger waves-effect waves-light">취소하기</Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};


export default withRouter(AddSpace);
