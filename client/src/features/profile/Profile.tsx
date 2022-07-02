import { Col, Row } from "react-bootstrap";
import Post from "../../common/components/Post";

export default function Profile() {
    return (
        <>
            <div className="header-profile">
                <div className="text-center" style={{ position: 'relative' }}>
                    <img src="/assets/netcore-react.png" className="rounded fit-img" alt="" />
                    <div className="img-block">
                        <img src="/assets/user.png" className="rounded-circle" style={{ maxWidth: 150, border: '4px solid green' }} />
                    </div>
                </div>
                <h2 className="text-center text-primary">hoai nam nguyen</h2>
            </div>
            <div className="body-profile">
                <Row>
                    <Col md={4}>
                        <div className="card">
                            <div className="card-header text-primary">Information</div>
                            <div className="card-body">
                                <div>
                                    <strong>Tên đăng nhập:</strong>
                                    <p>hoainam10th</p>
                                </div>
                                <div>
                                    <strong>Online lần cuối</strong>
                                    <p>1 phut ago</p>
                                </div>
                                <div>
                                    <strong>Ngày tham gia</strong>
                                    <p>12/10/2022</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <Post />
                    </Col>
                </Row>
            </div>            
        </>
    )
}