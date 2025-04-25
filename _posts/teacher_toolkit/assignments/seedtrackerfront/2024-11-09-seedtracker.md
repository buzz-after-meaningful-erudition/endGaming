---
layout: toolkit
active_tab: seed
title: Seed Tracker Teacher
type: ccc
permalink: /student/seedtracker
---




<div class="container mx-auto px-4 py-8 max-w-3xl">
    <div class="bg-transparent rounded-lg shadow-lg p-6 mb-6">
        <h1 class="text-3xl font-bold text-indigo-700 mb-6 border-b pb-2">Weekly Project Submission</h1>
        
        <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="studentId" class="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                    <input type="text" id="studentId" placeholder="Enter your Student ID" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                </div>
                <div>
                    <label for="studentName" class="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                    <input type="text" id="studentName" placeholder="Enter your name" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                </div>
            </div>
            
            <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" id="subject" placeholder="Enter subject" 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
            </div>
            
            <div>
                <label for="activityLog" class="block text-sm font-medium text-gray-700 mb-1">Weekly Activity Log</label>
                <textarea id="activityLog" rows="4" placeholder="Describe what you did this week..." 
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required></textarea>
            </div>

            <div class="flex flex-wrap gap-2 mt-4">
                <button class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" 
                        onclick="openModal('seedStarterModal')">Seed Starter</button>
                <button class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" 
                        onclick="openModal('classroomConductModal')">Classroom Conduct</button>
                <button class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" 
                        onclick="openModal('ecEventModal')">EC Event</button>
                <button class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" 
                        onclick="openModal('ecAssignmentModal')">EC Assignment</button>
                <button class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" 
                        onclick="openModal('attendanceModal')">Attendance</button>
            </div>
            
            <div class="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                <label class="text-lg font-medium text-gray-800">Total Seed: <span id="totalSeed" class="text-indigo-600 font-bold">0</span> / 3</label>
            </div>
            
            <div class="mt-6">
                <button class="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition" 
                        onclick="submitEntry()">Submit Entry</button>
            </div>
            
            <div id="message" class="mt-4 text-center text-lg"></div>
        </div>
    </div>
</div>

<!-- Modals -->
<div id="seedStarterModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden" onclick="event.stopPropagation();">
        <div class="flex justify-between items-center bg-indigo-600 text-white px-6 py-3">
            <h3 class="text-lg font-medium">Seed Starter</h3>
            <button class="text-white text-xl hover:text-gray-200" onclick="closeModal('seedStarterModal')">&times;</button>
        </div>
        <div class="p-6">
            <div class="flex items-center justify-center space-x-4 mb-6">
                <button class="w-10 h-10 bg-red-500 text-white rounded-full text-xl font-bold hover:bg-red-600 focus:outline-none" 
                        onclick="adjustScore('seedStarter', -0.1)">-</button>
                <div class="text-2xl font-bold"><span id="seedStarterValue">0</span> / 3</div>
                <button class="w-10 h-10 bg-green-500 text-white rounded-full text-xl font-bold hover:bg-green-600 focus:outline-none" 
                        onclick="adjustScore('seedStarter', 0.1)">+</button>
            </div>
            <div class="flex flex-wrap justify-center gap-2">
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('seedStarter', 0.01)">+0.01</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('seedStarter', 0.05)">+0.05</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('seedStarter', 0.25)">+0.25</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('seedStarter', 0.5)">+0.5</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('seedStarter', 1.0)">+1.0</button>
            </div>
        </div>
    </div>
</div>

<div id="classroomConductModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden" onclick="event.stopPropagation();">
        <div class="flex justify-between items-center bg-indigo-600 text-white px-6 py-3">
            <h3 class="text-lg font-medium">Classroom Conduct</h3>
            <button class="text-white text-xl hover:text-gray-200" onclick="closeModal('classroomConductModal')">&times;</button>
        </div>
        <div class="p-6">
            <div class="flex items-center justify-center space-x-4 mb-6">
                <button class="w-10 h-10 bg-red-500 text-white rounded-full text-xl font-bold hover:bg-red-600 focus:outline-none" 
                        onclick="adjustScore('classroomConduct', -0.1)">-</button>
                <div class="text-2xl font-bold"><span id="classroomConductValue">0</span></div>
                <button class="w-10 h-10 bg-green-500 text-white rounded-full text-xl font-bold hover:bg-green-600 focus:outline-none" 
                        onclick="adjustScore('classroomConduct', 0.1)">+</button>
            </div>
            <div class="flex flex-wrap justify-center gap-2">
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('classroomConduct', 0.01)">+0.01</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('classroomConduct', 0.05)">+0.05</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('classroomConduct', 0.25)">+0.25</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('classroomConduct', 0.5)">+0.5</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('classroomConduct', 1.0)">+1.0</button>
            </div>
        </div>
    </div>
</div>

<div id="ecEventModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden" onclick="event.stopPropagation();">
        <div class="flex justify-between items-center bg-indigo-600 text-white px-6 py-3">
            <h3 class="text-lg font-medium">EC Event</h3>
            <button class="text-white text-xl hover:text-gray-200" onclick="closeModal('ecEventModal')">&times;</button>
        </div>
        <div class="p-6">
            <div class="flex items-center justify-center space-x-4 mb-6">
                <button class="w-10 h-10 bg-red-500 text-white rounded-full text-xl font-bold hover:bg-red-600 focus:outline-none" 
                        onclick="adjustScore('ecEvent', -0.1)">-</button>
                <div class="text-2xl font-bold"><span id="ecEventValue">0</span></div>
                <button class="w-10 h-10 bg-green-500 text-white rounded-full text-xl font-bold hover:bg-green-600 focus:outline-none" 
                        onclick="adjustScore('ecEvent', 0.1)">+</button>
            </div>
            <div class="flex flex-wrap justify-center gap-2">
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('ecEvent', 0.01)">+0.01</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('ecEvent', 0.05)">+0.05</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('ecEvent', 0.25)">+0.25</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('ecEvent', 0.5)">+0.5</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('ecEvent', 1.0)">+1.0</button>
            </div>
        </div>
    </div>
</div>

<div id="ecAssignmentModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden" onclick="event.stopPropagation();">
        <div class="flex justify-between items-center bg-indigo-600 text-white px-6 py-3">
            <h3 class="text-lg font-medium">EC Assignment</h3>
            <button class="text-white text-xl hover:text-gray-200" onclick="closeModal('ecAssignmentModal')">&times;</button>
        </div>
        <div class="p-6">
            <div class="flex items-center justify-center space-x-4 mb-6">
                <button class="w-10 h-10 bg-red-500 text-white rounded-full text-xl font-bold hover:bg-red-600 focus:outline-none" 
                        onclick="adjustScore('ecAssignment', -0.1)">-</button>
                <div class="text-2xl font-bold"><span id="ecAssignmentValue">0</span></div>
                <button class="w-10 h-10 bg-green-500 text-white rounded-full text-xl font-bold hover:bg-green-600 focus:outline-none" 
                        onclick="adjustScore('ecAssignment', 0.1)">+</button>
            </div>
            <div class="flex flex-wrap justify-center gap-2">
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('ecAssignment', 0.01)">+0.01</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('ecAssignment', 0.05)">+0.05</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('ecAssignment', 0.25)">+0.25</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('ecAssignment', 0.5)">+0.5</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('ecAssignment', 1.0)">+1.0</button>
            </div>
        </div>
    </div>
</div>

<div id="attendanceModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden" onclick="event.stopPropagation();">
        <div class="flex justify-between items-center bg-indigo-600 text-white px-6 py-3">
            <h3 class="text-lg font-medium">Attendance</h3>
            <button class="text-white text-xl hover:text-gray-200" onclick="closeModal('attendanceModal')">&times;</button>
        </div>
        <div class="p-6">
            <div class="flex items-center justify-center space-x-4 mb-6">
                <button class="w-10 h-10 bg-red-500 text-white rounded-full text-xl font-bold hover:bg-red-600 focus:outline-none" 
                        onclick="adjustScore('attendance', -0.1)">-</button>
                <div class="text-2xl font-bold"><span id="attendanceValue">0</span></div>
                <button class="w-10 h-10 bg-green-500 text-white rounded-full text-xl font-bold hover:bg-green-600 focus:outline-none" 
                        onclick="adjustScore('attendance', 0.1)">+</button>
            </div>
            <div class="flex flex-wrap justify-center gap-2">
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('attendance', 0.01)">+0.01</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('attendance', 0.05)">+0.05</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('attendance', 0.25)">+0.25</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('attendance', 0.5)">+0.5</button>
                <button class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" 
                        onclick="adjustScore('attendance', 1.0)">+1.0</button>
            </div>
        </div>
    </div>
</div>

<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">

<script type="module">
    // Store scores in an object
    const scores = {
        seedStarter: 0,
        classroomConduct: 0,
        ecEvent: 0,
        ecAssignment: 0,
        attendance: 0
    };

    function adjustScore(id, change) {
        // Get current score
        let currentScore = scores[id];
        let newScore = currentScore + change;
        
        // Enforce limits
        newScore = Math.max(0, Math.min(3, newScore)); // Cannot go below 0 or above 3
        
        // Update score
        scores[id] = newScore;
        
        // Update display
        document.getElementById(`${id}Value`).innerText = newScore.toFixed(2);
        
        // Update total
        updateTotalSeed();
    }

    async function submitEntry() {
        const studentId = document.getElementById('studentId');
        const studentName = document.getElementById('studentName');
        const subject = document.getElementById('subject');
        const activityLog = document.getElementById('activityLog');
        const messageElement = document.getElementById('message');

        if (!studentId.value || !studentName.value || !subject.value || !activityLog.value) {
            messageElement.textContent = "Please fill in all fields before submitting.";
            messageElement.className = "mt-4 text-center text-lg text-red-600";
            return;
        }

        const totalSeed = parseFloat(document.getElementById('totalSeed').innerText);

        const entryData = {
            studentId: parseInt(studentId.value),
            name: studentName.value,
            subject: subject.value,
            grade: totalSeed,
            comment: activityLog.value.trim()
        };

        try {
            // Replace with your actual API endpoint
            const javaURI = '/api'; // This would normally come from your config.js
            const response = await fetch(`${javaURI}/api/seeds/`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(entryData)
            });

            if (response.ok) {
                const result = await response.json();
                messageElement.textContent = `Entry submitted successfully! Your Entry ID is: ${result.id}`;
                messageElement.className = "mt-4 text-center text-lg text-green-600";
                resetScores();
                clearForm();
            } else {
                const errorText = await response.text();
                messageElement.textContent = `Error submitting entry: ${errorText}`;
                messageElement.className = "mt-4 text-center text-lg text-red-600";
                console.error("Submission error:", errorText);
            }
        } catch (error) {
            messageElement.textContent = "Error submitting entry. Please try again.";
            messageElement.className = "mt-4 text-center text-lg text-red-600";
            console.error("Fetch error:", error);
        }
    }

    function openModal(id) { 
        document.getElementById(id).style.display = "flex"; 
    }

    function closeModal(id) { 
        document.getElementById(id).style.display = "none"; 
    }

    function resetScores() {
        // Reset all scores to 0
        Object.keys(scores).forEach(key => {
            scores[key] = 0;
            document.getElementById(`${key}Value`).innerText = "0";
        });
        updateTotalSeed();
    }

    function clearForm() {
        document.getElementById('studentId').value = '';
        document.getElementById('studentName').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('activityLog').value = '';
    }

    function updateTotalSeed() {
        // Calculate total from scores object
        const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
        // Update total display
        document.getElementById("totalSeed").innerText = Math.min(3, total).toFixed(2);
    }

    // Attach functions to window
    window.submitEntry = submitEntry;
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.adjustScore = adjustScore;
    window.updateTotalSeed = updateTotalSeed;
</script>