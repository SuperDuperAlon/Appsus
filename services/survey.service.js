
export const surveyService = {
    getById
}

function getById() {
    return Promise.resolve(survey)
}

var survey =
{
    title: 'Pet Shopping',
    cmps: [
        {
            type: 'textBox',
            id: 'p101',
            info: {
                label: 'To:'
            }
        },
        {
            type: 'textBox',
            id: 'p102',
            info: {
                label: 'Subject:'
            }
        },
        {
            type: 'textArea',
            id: 'p109',
            info: {
                label: 'Description'
            }
        },

       
    ]
}