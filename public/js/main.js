document.addEventListener('DOMContentLoaded', function() {
    const visionBoardContainer = document.getElementById('visionBoard');
    // Dynamically obtaining the organizationId from a data attribute on the visionBoardContainer
    const organizationId = visionBoardContainer.getAttribute('data-organization-id');

    async function fetchVision() {
        if (!organizationId) {
            console.log('No organization ID provided, skipping fetch vision.');
            visionBoardContainer.innerHTML = '<p>No vision set for this organization.</p>';
            return;
        }
        try {
            const response = await fetch(`/vision/${organizationId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch vision');
            }
            const vision = await response.json();
            if (vision && vision.content) {
                visionBoardContainer.innerHTML = `<h2>Vision Board</h2><p>${vision.content}</p>`;
            } else {
                visionBoardContainer.innerHTML = '<p>No vision set for this organization.</p>';
            }
        } catch (error) {
            console.error('Error fetching vision:', error.message, error.stack);
            visionBoardContainer.innerHTML = '<p>Error loading vision. Please try again later.</p>';
        }
    }

    fetchVision();

    // Assuming there's a form with id 'visionForm' for updating vision
    const visionForm = document.getElementById('visionForm');
    if (visionForm) {
        visionForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!organizationId) {
                alert('No organization ID provided, cannot update vision.');
                return;
            }
            const formData = new FormData(visionForm);
            const content = formData.get('content');
            try {
                const response = await fetch(`/vision/${organizationId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content }),
                });
                if (!response.ok) {
                    throw new Error('Failed to update vision');
                }
                const updatedVision = await response.json();
                visionBoardContainer.innerHTML = `<h2>Vision Board</h2><p>${updatedVision.content}</p>`;
                console.log('Vision updated successfully');
            } catch (error) {
                console.error('Error updating vision:', error.message, error.stack);
                alert('Error updating vision. Please try again.');
            }
        });
    }

    // Handling form submissions for adding employees and submitting reports
    document.getElementById('addEmployeeForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        try {
            const response = await fetch('/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });
            if (!response.ok) throw new Error('Failed to add employee');
            alert('Employee added successfully');
            console.log('Employee added successfully');
        } catch (error) {
            console.error('Error adding employee:', error.message, error.stack);
            alert('Error adding employee. Please try again.');
        }
    });

    document.getElementById('submitReportForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const employeeId = formData.get('employeeId');
        try {
            const response = await fetch(`/employees/${employeeId}/reports`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });
            if (!response.ok) throw new Error('Failed to submit report');
            alert('Report submitted successfully');
            console.log('Report submitted successfully');
        } catch (error) {
            console.error('Error submitting report:', error.message, error.stack);
            alert('Error submitting report. Please try again.');
        }
    });
});