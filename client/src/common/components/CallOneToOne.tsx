import { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Peer from 'peerjs';
import { useStore } from "../../stores/stores";
import { observer } from "mobx-react-lite";

export default observer(function CallOneToOneModal() {
    const currentUserVideoRef = useRef<any>(null);
    const remoteUserVideoRef = useRef<any>(null);
    const {presenceHubStore, userStore} = useStore();
    const peerInstance = useRef<any>(null);    

    useEffect(() =>{
        
        const peer = new Peer();
        peer.on('open', (id) => {
            //update lai peerId vi da tao peer moi
            presenceHubStore.updateUserPeer(id).then(() => {
                startStreamFromCurrentUser();                
            });                 
        });

        peer.on('call', async (call) => {
            let mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

            call.answer(mediaStream);
            
            call.on('stream', (otherUserVideoStream: MediaStream) => {                
                remoteUserVideoRef.current.srcObject = otherUserVideoStream;
                //setTimeout to fix error: (in promise) the play() request was interrupted by a new load request
                setTimeout(() => {
                    remoteUserVideoRef.current.play();// this is asynchronous!
                }, 50)
            });

            call.on('error', (err) => {
                console.error(err);
            })
        });

        peerInstance.current = peer;

        return ()=>{
            peer.destroy();
        }
    }, [presenceHubStore])

    async function startStreamFromCurrentUser() {
        try {
            let mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.load();
            currentUserVideoRef.current.play();

            if(presenceHubStore.usernameCalling !== ''){
                const userPeer = presenceHubStore.usersOnline.find(x=>x.member?.userName === presenceHubStore.usernameCalling);
                const call = peerInstance.current.call(userPeer?.peerId, mediaStream);
                call.on('stream', (remoteStream: MediaStream) => {
                    remoteUserVideoRef.current.srcObject = remoteStream;
                    setTimeout(() => {
                        remoteUserVideoRef.current.play();// this is asynchronous!
                    }, 50)                    
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <div style={{ position: 'relative' }}>
                        <video width='100%' ref={currentUserVideoRef} controls />
                        <span className="badge bg-danger" style={{ position: 'absolute', left: 1, top: 1 }}>
                            {userStore.user?.displayName}
                        </span>
                    </div>
                </Col>
                <Col>
                    <div style={{ position: 'relative' }}>
                        <video width='100%' ref={remoteUserVideoRef} controls />
                        <span className="badge bg-danger" style={{ position: 'absolute', left: 1, top: 1 }}>
                            Remote video
                        </span>
                    </div>
                </Col>
            </Row>
        </Container>
    )
})