"use strict";
const request = require('request'),
    querystring = require('querystring');

class MaxMinesAPI {

    /**
     *
     * @param secret_key MaxMines Secret Key
     */
    constructor (secret_key) {
        this.secret_key = secret_key;
    }

    /**
     * @description Phương thức request
     * @param method Phương thức request
     * @param post Có phải là HTTP POST không
     * @param data Dữ liệu request đi
     * @param callback Callback
     */
     static APIRequest(method, post, data, callback) {
        let req = {
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url: 'https://api.maxmines.com/' + method
        };

        if(!post) {
            req.url += '?' + querystring.stringify(data);
        } else {
            req.form = data;
        }

        request.post(req, function(error, response, body){
            if(error) callback({status: 504, message:'Lỗi kết nối'});
            else callback(body);
        });
     }

    /**
     * @description Xác minh token khi MaxMines.Token() đạt đủ giá trị cần thiết
     * @param token Token muốn xác minh
     * @param hashes Số lượng hash mà token này phải đạt được
     * @param callback Callback
     */
    verify(token, hashes, callback) {
        MaxMinesAPI.APIRequest('token/verify', true, {
            secret: this.secret_key,
            token: token,
            hashes: hashes
        }, callback);
    }

    /**
     * @description Xem tổng số hashes của một người dùng nào đó.
     * @param name Tên người dùng, tương tự như tên được chỉ định cho MaxMines.User . Đây là khóa chính duy nhất cho người dùng trên trang web của bạn. Ví dụ. tên người dùng, id, hàm hash md5 của họ tên hoặc địa chỉ email của họ.
     * @param callback Callback
     */
    balance(name, callback) {
        MaxMinesAPI.APIRequest('user/balance', false, {
            secret: this.secret_key,
            name: name
        }, callback);
    }

    /**
     * @description Rút hashes của người dùng. Nếu thành công, số hashes được yêu cầu sẽ được trừ vào số hashes của người dùng.
     * @param name Tên người dùng, tương tự như tên được chỉ định bằng MaxMines.User
     * @param amount Số hashes bạn muôn rút của người dùng.
     * @param callback Callback
     */
    withdraw(name, amount, callback) {
        MaxMinesAPI.APIRequest('user/withdraw', true, {
            secret: this.secret_key,
            name: name,
            amount: amount
        }, callback);
    }

    /**
     * @description Nhận danh sách người dùng hàng đầu được sắp xếp theo tổng số hashes
     * @param count Không bắt buộc. Số lượng người dùng được trả. Mặc định 128, tối thiểu 1, tối đa là 1024.
     * @param callback Callback
     */
    top(count, order, callback) {
        MaxMinesAPI.APIRequest('user/top', false, {
            secret: this.secret_key,
            count: count
        }, callback);
    }

    /**
     * @description Lấy một danh sách phân trang của tất cả người dùng theo thứ tự bảng chữ cái. Lưu ý rằng lệnh này sẽ chỉ trả về người dùng với tổng số băm lớn hơn 0.
     * @param count Không bắt buộc. Số lượng người dùng trả lại Mặc định 4096, tối thiểu 32, tối đa 8192.
     * @param page Không bắt buộc. Trang của người dùng trả lại, được lấy từ thuộc tính yêu cầu trước đó nextPage. Không áp dụng hoặc để trống để xuất trang đầu tiên.
     * @param callback Callback
     */
    list(count, page, callback) {
        MaxMinesAPI.APIRequest('user/list', false, {
            secret: this.secret_key,
            count: count,
            page: page
        }, callback);
    }

    /**
     * @description Đặt lại tổng số hashes của người dùng.
     * @param name Tên người dùng có số hash sẽ bị đặt lại về 0.
     * @param callback Callback
     */
    reset(name, callback) {
        MaxMinesAPI.APIRequest('user/reset', true, {
            secret: this.secret_key,
            name: name
        }, callback);
    }

    /**
     * @description Đặt lại số hashes của tất cả người dùng của bạn thành giá trị 0.
     * @param callback Callback
     */
    resetAll(callback) {
        MaxMinesAPI.APIRequest('user/reset-all', true, {
            secret: this.secret_key
        }, callback);
    }

    /**
     * @description Tạo một liên kết ngắn mới. Bạn cũng có thể làm điều này thủ công, từ dashboard.
     * @param url URL mục tiêu cho liên kết ngắn. Tối đa 255 ký tự.
     * @param hashes Số lượng hashes phải được giải quyết, trước khi người dùng được chuyển hướng đến URL mục tiêu.
     * @param callback Callback
     */
    create(url, hashes, callback) {
        MaxMinesAPI.APIRequest('link/create', true, {
            secret: this.secret_key,
            url: url,
            hashes: hashes
        }, callback);
    }

    /**
     * @description Nhận tỷ lệ xuất chi hiện tại và số liệu thống kê về network.
     * @param callback Callback
     */
    payout(callback) {
        MaxMinesAPI.APIRequest('stats/payout', false, {
            secret: this.secret_key
        }, callback);
    }

    /**
     * @description Nhận hashrate hiện tại, tổng số hashes, xmr đã thanh toán và đang chờ xử lý và lịch sử hàng giờ trong bảy ngày qua cho trang web.
     * @param callback Callback
     */
    site(callback) {
        MaxMinesAPI.APIRequest('stats/site', false, {
            secret: this.secret_key
        }, callback);
    }

    /**
     * @description Nhận lịch sử hàng giờ của tổng số hash và hash/s trong một khoảng thời gian của trang web.
     * @param begin Unix timestamp bắt đầu của giai đoạn bạn muốn lấy.
     * @param end Unix timestamp kết thúc của giai đoạn bạn muốn lấy.
     * @param callback Callback
     */
    history(begin, end, callback) {
        MaxMinesAPI.APIRequest('stats/history', false, {
            secret: this.secret_key,
            begin: begin,
            end: end
        }, callback);
    }


}

module.exports = MaxMinesAPI;