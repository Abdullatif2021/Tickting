import { environment } from "src/environments/environment";
const api_url = environment.apiUrl;

export const AppConfig = {
  api_url: api_url,
  endpoints: {
    getTickets: `${api_url}/get-tickets`, // get tickets list
    getActivities: `${api_url}/get-activities`, // get activites list
    createTickets: `${api_url}/create-ticket`,
    uploadFile1: `${api_url}/upload-attachment`,
    getGroups: `${api_url}/get-support-groups`,
    getConfig: `${api_url}/get-config`, // get config list (status,priorities,etc...)
    getTicketsSatistics: `${api_url}/get-ticket-statistics`, // get config list (status,priorities,etc...)
    getActivitiesSatistics: `${api_url}/get-activity-statistics`, // get config list (status,priorities,etc...)
    validateticket: `${api_url}/validate-ticket`,
    getSubfolders: `${api_url}/get-subfolders`,
    getTicketById: (id) => `${api_url}/get-ticket?id=${id}`,
    changeticketStatus: `${api_url}/change-state`,
    logout: `${api_url}/logout`,
    changePriorty: `${api_url}/change-priority`,
    createcomment: `${api_url}/create-comment`,
    uploadFile: `${api_url}/upload-attachment`,
    createActivity: `${api_url}/create-activity`,
    getAllContainers: `${api_url}/get-all-containers`,
    createFolder: `${api_url}/create-folder`,
    deleteFolder: `${api_url}/delete-folder`,
    createContainer: `${api_url}/create-container`,
    changeEntityState: `${api_url}/change-state`,
    changeEntityPriority: `${api_url}/change-priority`,
    updateTicket: `${api_url}/update-ticket`,
    changeChecklistState: `${api_url}/change-checklist-state`,
    createChecklist: `${api_url}/create-checklist`,
    updateActivity: `${api_url}/update-activity`,
    getActivityById: (id) => `${api_url}/get-activity?id=${id}`,
    getCookieInfo: `${api_url}/get-cookie-info`,
    updateChecklist: `${api_url}/update-checklist`,
    getAssignMember: (id, type) => `${api_url}/get-assign-members?id=${id}&type=${type}`,
    getMembers: (id, type) => `${api_url}/get-members?id=${id}&type=${type}`,
    assignNewUser: `${api_url}/assign-new-user`,
    addTrackedTime: `${api_url}/add-tracked-time`,
    loadLogs: (id, type, page, size) => `${api_url}/get-logs?entity_id=${id}&entity_type=${type}&page=${page}&per_page=${size}`,
    deleteChecklist: `${api_url}/delete-checklist`,
    deleteAttachment: `${api_url}/delete-attachment`
  },
  baseUrl: 'https://integraam.storexweb.com',
  allowedUploadFileExtessions: [
    'text/plain',
    'application/pdf',
    'image/jpg',
    'image/jpeg',
    'image/png',
    'video/mp4'
  ]
};

