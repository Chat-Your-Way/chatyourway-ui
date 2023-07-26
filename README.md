# README #

### Prepare for running app local

* Run `npm install`<br />
* Run `npm start` <br />

## React Component code styleguide

### Component structure

    import React, { useEffect, useState, useMemo, useCallback } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import lib from 'lib';
    
    import { fetchData } from '../fetchData'
    import { selectList, selectLoading } from '../selectors'
    import hooks from './hooks';
    import utils from './utils';
    import helper from './helper';
    import config from './config';
    import constants from './constants';
    import Component from './Component';
    import Button from '../common/Button';
    import Spinner from '../common/Spinner';

    const MyComponent = () => {
        const [editMode, setEditMode] = useState(false);
        const [values, setValues] = useState([]);

        const dispatch = useDispatch();
        const list = useSelector(selectList)
        const isLoading = useSelector(selectLoading(slicesName, thunksName || thunksNames[]));

        const valuesIds = useMemo(() => values.map(value => value.id), [values]);

        ...hooks, ...localStorage, ...constants;

        const getData = useCallback(() => {}, []);
        
        const handleClick = useCallback((item) => setValues(item),[]);
 
        useEffect(() => {
            dispatch(fetchData());
        }, [dispatch]);
        
        return (
            <>
                {isLoading && <Spinner />}
                <Component getData={getData} />
                <Button onClick={handleClick}>Click</Button>
            </>
        );
    };

    export default MyComponent;

### Project folder/file structure

    components
        common
            Button
                index.js
                Button.jsx
                ...otherFiles
            Modal
            ...
        pages
            Login
                Login.jsx
                index.js
                ...otherFiles


### Branch naming

* Use git-flow for naming branch https://danielkummer.github.io/git-flow-cheatsheet/
* Commit message should include branch name.
