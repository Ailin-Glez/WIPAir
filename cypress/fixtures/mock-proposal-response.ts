const proposalsNames = ['Best', 'Better', 'Good', 'Repair'];

const baseProposal = {
    success: {
        code: 100,
        message: 'OK'
    },
    payLoad: null,
    session_token: null,
    client_version: '1642077721',
    meta: {
        version: 'v1.252.3.ENGE-6911-6930-6945-6947.a697d61ae',
        commit: 'a697d61ae',
        environment: 'production',
        author: 'OnCall Air Team'
    }
};

function getFlexJob(label: string, index: number) {
    return {
        proposal_id: 8272 + index,
        position: 1 + index,
        label,
        jobs: [
            {
                id: 1393 + index,
                name: 'Warranty',
                code: null,
                category: 'Water Heater Installation',
                sub_category: 'General Water Heater',
                custom_description: '',
                price: 799,
                products: []
            }
        ],
        systems: [],
        jobs_recommended: []
    };
}

export function mockProposalBody(token: string, withValue: boolean) {
    const proposal = { ...baseProposal };
    proposal.session_token = token;
    proposal.payLoad = [];

    if (withValue) {
        proposalsNames.forEach((prop, index) => {
            proposal.payLoad.push(getFlexJob(prop, index));
        });
    }

    return proposal;
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
