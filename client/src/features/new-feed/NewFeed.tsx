import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useStore } from "../../stores/stores";
import LiveStreamPage from "../../common/components/LiveStreamPage";
import { observer } from "mobx-react-lite";
import CallGroupPage from "../../common/components/CallGroupPage";
import Post from "../../common/components/Post";
import CallOneToOnePage from "../../common/components/CallOneToOne";


export default observer(function NewFeed() {
    const { modalStore, audioStore, modalMakeACallAnswer } = useStore();

    return (
        <>
            <Row className="justify-content-center">
                <Col sm={8}>
                    <Post />
                </Col>

                <Col sm={4} style={{ marginTop: 5 }} className='new-feed-max-height-live-stream'>
                    <div style={{ position: 'relative' }}>
                        <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: 200, backgroundColor: 'black' }}>
                            <OverlayTrigger
                                placement='top'
                                overlay={
                                    <Tooltip id="top">
                                        Click on this to join live stream.
                                    </Tooltip>
                                }
                            >
                                <div id="user-live-stream" onClick={() => modalStore.openModal("Live stream", <LiveStreamPage />)} className="border-green text-white" style={{ padding: 10 }}>
                                    <h6>hoainam10th live stream</h6>
                                </div>
                            </OverlayTrigger>
                        </div>
                        <span className="badge bg-danger" style={{ position: 'absolute', left: 1, top: 1 }}>
                            Streaming
                        </span>
                    </div>
                </Col>
                <Col>                
                    <Button variant="secondary" onClick={audioStore.toogle}>{audioStore.playing ? 'pause' : 'play'}</Button>
                    <Button variant="danger" onClick={() => modalStore.openModal("Call One-One", <CallOneToOnePage />)}>call 1-1</Button>
                    <Button variant="primary" onClick={() => modalStore.openModal("Call group", <CallGroupPage />)}>call group</Button>
                    <Button variant="primary" onClick={() => modalMakeACallAnswer.openModal('A call from hoainam10th')}>Cuoc goi den</Button>
                </Col>
            </Row>
        </>
    )
})