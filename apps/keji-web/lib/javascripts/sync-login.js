let getSessionId = () => {
    let session_id = {keji: '', p2p: '', zx: ''}
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://passport.9888keji.com/passport/synAuth`,
            success: data => {
                session_id.keji = data.data.curr
                resolve()
            },
            dataType: 'jsonp'
        })
    }).then(() => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://passport.gongchangp2p.com/passport/synAuth`,
                success: data => {
                    session_id.p2p = data.data.curr
                    resolve()
                },
                dataType: 'jsonp'
            })
        })
    }).then(() => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://passport.gongchangzx.com/passport/synAuth`,
                success: data => {
                    session_id.zx = data.data.curr
                    resolve()
                },
                dataType: 'jsonp'
            })
        })
    }).then(() => {
        return session_id
    })
}

let getToken = () => {
    let token = {loginTicket: '', pubsec: ''}
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://passport.9888keji.com/passport/async/getToken`,
            success: data => {
                token.loginTicket = data.data.loginTicket
                token.pubsec = data.data.pubsec
                resolve()
            },
            dataType: 'jsonp'
        })
    }).then(() => {
        return token
    })
}

//RSA加密
let enscr = (pwd, pubsec) => {
    let crypt = new JSEncrypt();
    crypt.setPublicKey(pubsec);
    return crypt.encrypt(pwd);
}

//tokenid,username,password,loginType,sitid
let goSyncLog = (userName, userPsd) => {
    let tokenId, rsaKey, session_id_keji, session_id_p2p, session_id_zx
    return new Promise((resolve, reject) => {
        getSessionId().then(data => {
            session_id_keji = data.keji
            session_id_p2p = data.p2p
            session_id_zx = data.zx
        }).then(() => {
            getToken().then(data => {
                tokenId = data.loginTicket
                rsaKey = data.pubsec
            }).then(() => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: `http://passport.9888keji.com/passport/async/login`,
                        data: {
                            tokenId: tokenId,
                            username: userName,
                            password: enscr(userPsd, rsaKey),
                            loginType: '01',
                            sitid: `${session_id_keji}:${session_id_p2p}:${session_id_zx}`
                        },
                        dataType: "jsonp",
                        success: data => {
                            resolve()
                            console.log(data)
                        }
                    })
                })
            })
        })
    })
}



