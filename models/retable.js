const axios = require('axios');
require('dotenv').config();
const base_url = "https://api.retable.io/v1/public";

const accessDB = async () => {
    try {
        let retable = { workspace_id: '', project_id: '', table_id: '' };
        retable.workspace_id = await getWorkspace()

        if (retable.workspace_id != '') {
            //Find the project and grab the project's table
            retable.project_id = await getProject(retable.workspace_id);
            retable.table_id = await getTable(retable.project_id);
        } else {
            //Create New Workscape-->Project-->Table
            retable.workspace_id = await createWorkspace();
            retable.project_id = await createProject(retable.workspace_id);
            await createTable(retable.project_id);
            retable.table_id = await getTable(retable.project_id);
        }
        //console.log(retable)
        return retable;
    } catch (error) {
        console.error(error)
    }
}

async function createWorkspace() {
    let response = await axios(base_url + '/workspace', {
        method: 'POST',
        headers: {
            'ApiKey': process.env.API_KEY
        },
        data: { name: 'Database', description: 'Database for stock management' }
    })
    console.log('Workspace: ' + response.data.data.name + ' created');
    return response.data.data.id;
    // console.error(error.response.statusText, error.response.status);
}

async function getWorkspace() {
    let response = await axios(base_url + '/workspace', {
        method: 'GET',
        headers: {
            'ApiKey': process.env.API_KEY
        }
    });
    let id = '';
    response.data.data.workspaces.forEach(element => {
        if (element.name == 'Database') {
            id = element.id;
        }
    })
    return id;
}

async function createProject(workspace_id) {
    let response = await axios(base_url + '/workspace/' + workspace_id + '/project', {
        method: 'POST',
        headers: {
            'ApiKey': process.env.API_KEY
        },
        data: { name: 'DB PROJECT', description: 'Database project for stock management' }
    })
    console.log('Project: ' + response.data.data.name + ' created');
    return response.data.data.id;
    // console.error(error.response.statusText, error.response.status);
}

async function getProject(workspace_id) {
    let response = await axios(base_url + '/workspace/' + workspace_id + '/project', {
        method: 'GET',
        headers: {
            'ApiKey': process.env.API_KEY
        }
    })
    let project_id = '';
    response.data.data.projects.forEach(element => {
        if (element.name == 'DB PROJECT') {
            project_id = element.id;
        }
    });
    return project_id;
}


async function createTable(project_id) {
    //GET PROJECT by project_id
    let response = await axios(base_url + '/project/' + project_id, {
        method: 'GET',
        headers: {
            'ApiKey': process.env.API_KEY
        }
    })
    let retable_id = '';
    response.data.data.retables.forEach(element => {
        if (element.title == 'Retable 1') {
            retable_id = element.id;
        }
    });

    let response2 = await axios(base_url + '/retable/' + retable_id + '/column', {
        method: 'POST',
        headers: {
            'ApiKey': process.env.API_KEY
        },
        data: { columns: [{ "title": "Id", "type": "text" }, { "title": "Inventory", "type": "number" }, { "title": "Updated_at", "type": "calender" }, { "title": "Created_at", "type": "calender" }] }
    })
    console.log('Columns: created');
}

async function getTable(project_id) {
    //GET PROJECT by project_id and add column to retable
    let response = await axios(base_url + '/project/' + project_id, {
        method: 'GET',
        headers: {
            'ApiKey': process.env.API_KEY
        }
    })
    let retable_id = '';
    response.data.data.retables.forEach(element => {
        if (element.title == 'Retable 1') {
            retable_id = element.id;
        }
    });
    return retable_id;
}


module.exports = { accessDB };