// src/hooks/useSyncDataWithUrl.js
import { useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useData, ActionTypes } from '../contexts/DataContext';
import dayjs from 'dayjs';

const formatDateString = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
};

const useSyncDataWithUrl = () => {
    const { state, dispatch } = useData();
    const navigate = useNavigate();
    const location = useLocation();
    const hasInitialized = useRef(false);

    const urlParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    useEffect(() => {
        if (hasInitialized.current) return;

        const selectedTeam = urlParams.get('selectedTeam');
        const selectedPlayers = urlParams.get('selectedPlayers');
        const startDate = urlParams.get('startDate');
        const endDate = urlParams.get('endDate');
        const seasonTypes = urlParams.get('seasonTypes');
        const regularSeason = urlParams.get('regularSeason');
        const postSeason = urlParams.get('postSeason');
        const preSeason = urlParams.get('preSeason');
        const familyBet = urlParams.get('familyBet');

        if (selectedTeam) {
            dispatch({ type: ActionTypes.SET_SELECTED_TEAM, payload: JSON.parse(selectedTeam) });
        }
        if (selectedPlayers) {
            dispatch({ type: ActionTypes.SET_SELECTED_PLAYERS, payload: JSON.parse(selectedPlayers) });
        }
        if (startDate) {
            dispatch({ type: ActionTypes.SET_START_DATE, payload: dayjs(startDate) });
        }
        if (endDate) {
            dispatch({ type: ActionTypes.SET_END_DATE, payload: dayjs(endDate) });
        }
        if (seasonTypes) {
            dispatch({ type: ActionTypes.SET_SEASON_TYPES, payload: seasonTypes.split(',') });
        }
        if (regularSeason) {
            dispatch({ type: ActionTypes.SET_REGULAR_SEASON, payload: regularSeason === 'true' });
        }
        if (postSeason) {
            dispatch({ type: ActionTypes.SET_POST_SEASON, payload: postSeason === 'true' });
        }
        if (preSeason) {
            dispatch({ type: ActionTypes.SET_PRE_SEASON, payload: preSeason === 'true' });
        }
        if (familyBet) {
            dispatch({ type: ActionTypes.SET_FAMILY_BET, payload: familyBet === 'true' });
        }

        hasInitialized.current = true;
    }, [urlParams, dispatch]);

    useEffect(() => {
        if (!hasInitialized.current) return;

        const params = new URLSearchParams();
        const defaultState = {
            selectedTeam: {},
            selectedPlayers: [],
            startDate: dayjs().subtract(7, 'day').startOf('day'),
            endDate: dayjs().startOf('day'),
            seasonTypes: ['regular-season'],
            regularSeason: true,
            postSeason: false,
            preSeason: false,
            familyBet: false,
        };

        if (JSON.stringify(state.selectedTeam) !== JSON.stringify(defaultState.selectedTeam)) {
            params.set('selectedTeam', JSON.stringify(state.selectedTeam));
        }
        if (JSON.stringify(state.selectedPlayers) !== JSON.stringify(defaultState.selectedPlayers)) {
            params.set('selectedPlayers', JSON.stringify(state.selectedPlayers));
        }
        if (formatDateString(state.startDate) !== formatDateString(defaultState.startDate)) {
            params.set('startDate', formatDateString(state.startDate));
        }
        if (formatDateString(state.endDate) !== formatDateString(defaultState.endDate)) {
            params.set('endDate', formatDateString(state.endDate));
        }
        if (JSON.stringify(state.seasonTypes) !== JSON.stringify(defaultState.seasonTypes)) {
            params.set('seasonTypes', state.seasonTypes.join(','));
        }
        if (state.regularSeason !== defaultState.regularSeason) {
            params.set('regularSeason', state.regularSeason);
        }
        if (state.postSeason !== defaultState.postSeason) {
            params.set('postSeason', state.postSeason);
        }
        if (state.preSeason !== defaultState.preSeason) {
            params.set('preSeason', state.preSeason);
        }
        if (state.familyBet !== defaultState.familyBet) {
            params.set('familyBet', state.familyBet);
        }

        const newSearch = params.toString();
        if (location.search !== `?${newSearch}`) {
            navigate({ search: newSearch }, { replace: true });
        }
    }, [state, navigate, location.search]);
};

export default useSyncDataWithUrl;
