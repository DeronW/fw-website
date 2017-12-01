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
                resolve(token)
            },
            dataType: 'jsonp'
        })
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
    let id = {}
    let p1 = new Promise((resolve, reject) => {
        getSessionId().then(data => {
            id.sessionId = data
            resolve()
        })
    })

    let p2 = new Promise((resolve, reject) => {
        getToken().then(data => {
            id.tokenId = data
            resolve()
        })
    })

    return Promise.all([p1, p2]).then(data => {
        return $.ajax({
            url: `http://passport.9888keji.com/passport/async/login`,
            data: {
                tokenId: id.tokenId.loginTicket,
                username: userName,
                password: enscr(userPsd, id.tokenId.pubsec),
                loginType: '01',
                sitid: `${id.sessionId.keji};${id.sessionId.p2p};${id.sessionId.zx}`
            },
            dataType: "jsonp"
        })
    })
}




