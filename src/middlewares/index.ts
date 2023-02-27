import checkIfEmail from "./checkIfEmail.middleware";
import checkBodyRequest from "./checkBodyReq.middleware";
import checkToken from "./checkToken.middleware";
import checkAdminStatus from "./checkAdminStatus.middleware";
import checkIfID from "../middlewares/checkIfID.middleware"

export { checkIfEmail, checkBodyRequest, checkToken, checkAdminStatus, checkIfID };
