const axios = require('axios');
require('dotenv').config();
const base_url = process.env.BASE_URL;
axios.defaults.headers.common['ApiKey'] = process.env.API_KEY;

const accessDB = async () => {
    process.env.WORKSPACE_ID = await getWorkspace()

    if (process.env.WORKSPACE_ID != '') {
        //Find the project and grab the project's table
        process.env.PROJECT_ID = await getProject();
        process.env.PRODUCT_TABLE_ID = await getTable();
    } else {
        //Create New Workscape-->Project-->Table
        process.env.WORKSPACE_ID = await createWorkspace();
        process.env.PROJECT_ID = await createProject();
        await createTable();
        process.env.PRODUCT_TABLE_ID = await getTable();
    }

}

async function createWorkspace() {
    let response = await axios(base_url + '/workspace', {
        method: 'POST',
        data: { name: 'Database', description: 'Database for stock management' }
    })
    console.log('Workspace: ' + response.data.data.name + ' created');
    return response.data.data.id;
}

async function getWorkspace() {
    let response = await axios(base_url + '/workspace');
    let id = '';
    response.data.data.workspaces.forEach(element => {
        if (element.name == 'Database') {
            id = element.id;
        }
    })
    return id;
}

async function createProject() {
    let response = await axios(base_url + '/workspace/' + process.env.WORKSPACE_ID + '/project', {
        method: 'POST',
        data: { name: 'DB PROJECT', description: 'Database project for stock management' }
    })
    console.log('Project: ' + response.data.data.name + ' created');
    return response.data.data.id;
}

async function getProject() {
    let response = await axios(base_url + '/workspace/' + process.env.WORKSPACE_ID + '/project')
    let project_id = '';
    response.data.data.projects.forEach(element => {
        if (element.name == 'DB PROJECT') {
            project_id = element.id;
        }
    });
    return project_id;
}


async function createTable() {
    //GET PROJECT by project_id
    let response = await axios(base_url + '/project/' + process.env.PROJECT_ID)
    let retable_id = '';
    response.data.data.retables.forEach(element => {
        if (element.title == 'Retable 1') { //It creates "Retable 1" table as default while creating the project.
            retable_id = element.id;
        }
    });

    await axios(base_url + '/retable/' + retable_id + '/column', {
        method: 'POST',
        data: {
            columns: [
                { "title": "Id", "type": "text" },
                { "title": "Inventory", "type": "number" },
                { "title": "Updated_at", "type": "text" },
                { "title": "Created_at", "type": "text" }
            ]
        }
    })
    console.log('Columns: created');
}

async function getTable() {
    //GET PROJECT by project_id and add column to retable
    let response = await axios(base_url + '/project/' + process.env.PROJECT_ID)
    let retable_id = '';
    response.data.data.retables.forEach(element => {
        if (element.title == 'Retable 1') {
            retable_id = element.id;
        }
    });
    return retable_id;
}


module.exports = { accessDB };