import React from "react"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Container } from "reactstrap"

const SpaceDetail = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="공간 관리" breadcrumbItem="공간 상세 정보" />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default SpaceDetail
