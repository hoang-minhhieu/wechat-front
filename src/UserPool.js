import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "eu-west-3_JkJqW0lEe",
    ClientId: "7s4pcq01btot90f8d30gnasorm"
}

export default new CognitoUserPool(poolData)