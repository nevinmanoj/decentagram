import { useState, useContext, useEffect } from "react";
import { chatcontractAddress, chatcontractABI } from "../chat/chatConstants";
import "./chatWindow.css"
import { testContext } from "../../context/testContext";
import Web3 from 'web3';
export default function ChatWindow(props) {
    const { parameter } = props;


    const [msg, setmsg] = useState("");
    const [msglist, setmsglist] = useState([]);

    let web3 = new Web3(window.ethereum)
    let chatcontract = new web3.eth.Contract(chatcontractABI, chatcontractAddress);
    let {
        connectedAccount
    } = useContext(testContext);

    const getMessages=async()=>{
        chatcontract.getPastEvents('message', {
            fromBlock: 0,
            toBlock: 'latest',

        }, function (err, data) {
            //   var msgs=[["test","rec"],["test","rec"],["test","rec"],["test","snd"],["test","rec"],["test","snd"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"],["test","rec"]];
            var msgs = [];

            let x = data.length;
            for (var n = 0; n < x; n++) {

                if (data[n].returnValues.to.toLowerCase() === connectedAccount) {

                    if (data[n].returnValues.from.toLowerCase() === parameter[0].toLowerCase()) {

                        msgs.push([data[n].returnValues.message, "rec"]);
                        // rec
                    }

                }
                if (data[n].returnValues.to.toLowerCase() === parameter[0].toLowerCase()) {
                    if (data[n].returnValues.from.toLowerCase() === connectedAccount) {
                        msgs.push([data[n].returnValues.message, "snd"]);
                        //send
                    }

                }
            }

            setmsglist(msgs);

        });
    };

    useEffect(() => {
        const messageEvent = chatcontract.events.message();
    messageEvent.on('data', async(event) =>{
      console.log("blockchain updated");
       getMessages();
    });
        getMessages();
    }, [parameter]);

    


    function sendMessage() {
        var message = msg;
        var address = parameter[0];
        var date = new Date().toLocaleDateString("IN");
        var time = new Date().toLocaleTimeString("IN");
        time = time.split('.')
        var accurateTime = date + ' ' + time[0] + ':' + time[1];

        chatcontract.methods.sendMessage(connectedAccount, address, message, accurateTime).send({ from: connectedAccount }, function (err, transcationHash) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("message sent,trnx hash:" + transcationHash);
            }
        });
    }


    return (
        <div class="outertest"/*style={{ display: 'flex',flexDirection: 'column',height: '100%'}}*/>

            {parameter[1].split("@")[0]}
            <div class="test"/*style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}*/>


                <div class="messages">
                    {msglist.map((ms, i) => (<div class={ms[1]}>{ms[0]} <br /></div>))}
                </div>


            </div>
            <div class="msg-send-outer">
                <input type="text" class="msg-send-box" onChange={(e) => setmsg(e.target.value)} />
                <div class="msg-send-btn" onClick={() => sendMessage()}>Send</div>

            </div>
        </div>
    );
}

