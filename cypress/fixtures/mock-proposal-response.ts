export function mockProposalBody(token: string) {
    return {
        success: {
            code: 100,
            message: 'OK'
        },
        payLoad: [],
        session_token: token,
        client_version: '1642077721',
        meta: {
            version: 'v1.252.3.ENGE-6911-6930-6945-6947.a697d61ae',
            commit: 'a697d61ae',
            environment: 'production',
            author: 'OnCall Air Team'
        }
    };
}

export const consultationStagingTest = {
    customer_id: 2305,
    customer_location_id: 2243,
    consultation_id: 4044,
    consultation_name: 'TEST',
    consultation_code: 'ENG3WNNNA',
    consultation_assigned_user_id: 100,
    consultation_client_state: 'proposal.equipment',
    consultation_current_client_state: 'proposal.equipment',
    status: 'draft'
};
