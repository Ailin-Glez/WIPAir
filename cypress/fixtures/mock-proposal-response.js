export function mockProposalBody(token) {
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

export const consultationTest = {
    customer_id: 459498,
    customer_location_id: 458338,
    consultation_id: 472846,
    consultation_name: 'TEST',
    consultation_code: 'ENGMYFTV0',
    consultation_assigned_user_id: 7103,
    consultation_client_state: 'proposal.equipment',
    consultation_current_client_state: 'proposal.equipment',
    status: 'draft',
    provider_id: 792
};
