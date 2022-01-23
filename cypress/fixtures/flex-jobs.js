const flexJobNames = [
    "Commercial HVAC", "Electrical Installation", "General Home Service", "HVAC Service & Repair",
    "Indoor Air Quality", "Plumbing Installation", "Residential HVAC - Cooling Only",
    "Residential HVAC - Heating & Cooling", "Residential HVAC - Heating Only", "Service & Maintenance Plan", "Smart & Green Home"
]

function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

export const flexJobToSelect = getRandomValue(flexJobNames)