(() => {
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
        let token = {loginTicket: '', pubsec: ''};
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


})()


