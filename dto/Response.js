class ResponseDTO {
  constructor(statusCode, statusMessage, payload) {
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    this.payload = payload;
  }
}

module.exports = ResponseDTO;
