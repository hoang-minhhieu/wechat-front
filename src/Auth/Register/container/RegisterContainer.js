import { connect } from "react-redux";
import RegisterComponent from "../component/RegisterComponent";
import { user } from "../../../Actions/Actions";


const mapStateToProps = (_ownProps) => ({
});

const mapDispatchToProps = (dispatch) => ({
   dispatchUser: (data) => {
      dispatch(user(data))
   }

});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)