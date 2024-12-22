import React, { useEffect, useMemo, useState } from "react"
import {
  Card,
  CardBody,
  Col,
  Container, DropdownItem, DropdownMenu, DropdownToggle,
  Row, UncontrolledDropdown, UncontrolledTooltip
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer } from "react-toastify"
import DeleteModal from "../../components/Common/DeleteModal"
import Spinners from "../../components/Common/Spinner"
import TableContainer from "../../components/Common/TableContainer"
import * as PropTypes from "prop-types"
import axios from "axios"

function PatternFormat(props) {
  return null
}

PatternFormat.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  format: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any
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
  value: PropTypes.any
}
const AdminList = props => {
  document.title = "Dashboard | Skote - React Admin & Dashboard Template";
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setLoading] = useState(false)

  const getUserList = async () => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNzUzNjlmZS05MTU5LTQ1OTctYTFlNi0xMWEyOTYyOTE1YWYiLCJpYXQiOjE3MzQ4NDA0MTAsImV4cCI6MTczNDg0NjQxMH0.5qhixXm_vuap5DP338GYuPaWXtfIMrRTxCDqcC8ERYc'
        }
      }
      const {data, status} = await axios.get('https://localhost/api/user', config)
      setCustomers(data.body.data)
      console.log(data.body.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getUserList()
  }, [])

  // const [modal, setModal] = useState(false);
  // const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [customers, setCustomers] = useState([])
  const handleDeleteCustomer = () => {
    if (customer && customer.id) {
      // dispatch(onDeleteCustomer(customer.id));
      // setDeleteModal(false);
      // setCustomer(null)
    }
  };
  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
        cell: () => {
          return <input type="checkbox" className="form-check-input" />;
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
        cell: (cell) => {
          return (
            <>
              {console.log(cell)}
              <p className="mb-0">{cell.row.original.email}</p>
            </>
          );
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
        cell: (cell) => {
          const date = new Date(cell.row.original.createdAt);
          const formattedDate = date.toISOString().split('T')[0];
          return <p className="mb-0">{formattedDate}</p>;
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
        cell: (cellProps) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="card-drop">
                <i className="mdi mdi-dots-horizontal font-size-18"></i>
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  onClick={() => {
                    const customerData = cellProps.row.original;
                    // handleCustomerClick(customerData);
                  }
                  }
                >
                  <i className="mdi mdi-pencil font-size-16 text-success me-1" id="edittooltip"></i>
                  Edit
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </DropdownItem>

                <DropdownItem
                  onClick={() => {
                    const customerData = cellProps.row.original;
                    // onClickDelete(customerData);
                  }}>
                  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="deletetooltip"></i>
                  Delete
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        }
      },
    ],
    []
  );
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
          <Breadcrumbs title="사용자 관리" breadcrumbItem="운영진" />
          <Row>
            {
              isLoading ? <Spinners setLoading={setLoading} />
                :
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
                        // handleUserClick={handleCustomerClicks}
                        buttonClass="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2 addCustomers-modal"
                        buttonName=" New Customers"
                        paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                        tableClass="align-middle table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                        theadClass="table-light"
                        pagination="pagination"
                        SearchPlaceholder="search..."
                      />
                    </CardBody>
                  </Card>
                </Col>
            }
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

export default AdminList