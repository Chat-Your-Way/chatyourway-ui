# README

### Prepare for running app local

- Run `npm install`<br />
- Run `npm prepare`<br />
- Run `npm start` <br />

## React Component code styleguide

### Component structure

    import React, { useEffect, useState, useMemo, useCallback, memo } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import lib from 'lib';

    import { fetchData } from '../redux/mySlice/operations'

    import { useMyHook } from '../hooks';
    import { totalSum } from '../utils';
    import constants from '../constants';

    import { CustomList } from './conponents';
    import { Input, Button } from '../ui-kit';

    const MyComponent = () => {
        const [editMode, setEditMode] = useState(false);
        const [values, setValues] = useState([]);

        const list = useSelector(selectList);

        const dispatch = useDispatch();

        const valuesIds = useMemo(() => values.map(value => value.id), [values]);

        const handleClick = useCallback((item) => setValues(item),[]);

        useEffect(() => {
            dispatch(fetchData());
        }, [dispatch]);

        return (
            <>
                <CustomList valuesIds={valuesIds}/>
                <Input />
                <Button onClick={handleClick}>Click</Button>
            </>
        );
    };

    export default memo(MyComponent);

### Project folder/file structure

    components
        LoginPageComponent
            conponents(optional)
                CustomList
                    CustomList.jsx
                    index.js
                    styles.js
                ...otherFiles
            LoginPageComponent.jsx
            index.js
            styles.js
        common
            ReusedElement
                index.js
                ReusedElement.jsx
                styles.js
    pages
        Login
            Login.jsx
            index.js
        ...otherFiles
    redux
        mySlice
            mySlice.js
            operations.js
        ...otherFiles
        store.js
    helpers
        axiosConfig.js
        ...otherFiles
    ui-kit
         Button
            index.js
            Button.jsx
            styles.js
        Input
            index.js
            Input.jsx
            styles.js
        ...otherFiles
        index.js
    constants
        index.js
        PATH.js
    hooks
        useMyHook.js
        ...otherFiles
        index.js
    utils
        totalSum.js
        ...otherFiles
        index.js

### Branch naming

* Branch name JiraCardId-My-jira-card-name
* Commit message https://www.conventionalcommits.org/en/v1.0.0/
* PR must be named the same as branch
