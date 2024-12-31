import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import httpRequest from '~/api/httprequest';
import { getToken } from '~/redux/selector/AuthSelector';

const useAxiosJwt = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(getToken);

    const getAxiosJwt = () => httpRequest(token, dispatch, navigate);

    return { getAxiosJwt, dispatch, navigate, token };
};

export default useAxiosJwt;
