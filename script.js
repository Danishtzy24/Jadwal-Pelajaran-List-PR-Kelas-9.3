document.addEventListener("DOMContentLoaded", () => {
    const scheduleData = [
        { day: "Senin", subjects: [
            { name: "Bahasa Indonesia", teacher: "Nurain, S.Pd" },
            { name: "IPS", teacher: "Eko Suwarmo, S.Pd" },
            { name: "PJOK", teacher: "Rismanto, S.Pd., MA" },
            { name: "Bahasa Inggris", teacher: "Siti Suryani, S.Pd" },
            { name: "SBK", teacher: "Ida Farida, S.Ag" }
        ]},
        { day: "Selasa", subjects: [
            { name: "PKN", teacher: "Lilik Haryani, S.Pd" },
            { name: "Bahasa Indonesia", teacher: "Nurain, S.Pd" },
            { name: "Matematika", teacher: "Lely Farhani, S.Pd" },
            { name: "Bahasa Inggris", teacher: "Siti Suryani, S.Pd" },
            { name: "IT", teacher: "Muhammad Farrel Sidqi, S.Pd" }
        ]},
        { day: "Rabu", subjects: [
            { name: "IPA", teacher: "H. Faqih Usman, M.Pd" },
            { name: "MTK", teacher: "Lely Farhani, S.Pd" },
            { name: "SKI", teacher: "Hj. Emi Karyati, S.Ag" },
            { name: "IPS", teacher: "Eko Suwarmo, S.Pd" },
            { name: "Bahasa Arab (1 jam)", teacher: "H. Taufik Husein, SS., M.Pd" },
            { name: "PJOK (1 jam)", teacher: "Rismanto, S.Pd.,MA" }
        ]},
        { day: "Kamis", subjects: [
            { name: "Aqidah Akhlaq", teacher: "Dra. Hj. Nursaena" },
            { name: "FIKIH", teacher: "Ahmad Zakaria, Lc" },
            { name: "Tahfidz", teacher: "Jiah Ulhak, S.Pd" },
            { name: "PKN", teacher: "Lilik Haryani, S.Pd" },
            { name: "Bahasa Arab (1 jam)", teacher: "H. Taufik Husein, SS., M.Pd" }
        ]},
        { day: "Jumat", subjects: [
            { name: "Bahasa Indonesia", teacher: "Nurain, S.Pd" },
            { name: "IPA", teacher: "H. Faqih Usman, M.Pd" },
            { name: "Qurdist", teacher: "Arini Saila Haq, Lc" }
        ]}
    ];

    const taskData = [
        {
            subject: "Bahasa Indonesia",
            description: "Kerjakan Lks Hal 15 Asesment Formatif 3 Beserta 2 Soal Hots Di Hal 16",
            dueDate: new Date("2024-08-05"),
        },
        {
            subject: "SBK (Jika Sudah Menggambar)",
            description: "Kerjakan Lks hal 26 A dan B",
            dueDate: new Date("2024-08-05"),
        },
        {
            subject: "PKN",
            description: "Setor Hafalan UUD",
            dueDate: new Date("2024-08-06"),
        },
        {
            subject: "IT",
            description: "Kerjakan Lks Hal 12 Bagian A",
            dueDate: new Date("2024-08-06"),
        },
        {
            subject: "SKI",
            description: "Kerjakan Lks Hal 9 Bagian A",
            dueDate: new Date("2024-08-07"),
        },
        {
            subject: "Tahfidz",
            description: "Setorsn Hafalan",
            dueDate: new Date("2024-08-08"),
        },
    ];

    function updateDateTime() {
        const now = new Date();
        const dateTimeString = now.toLocaleString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
        document.getElementById("datetime").innerText = dateTimeString;
    }

    function renderSchedule() {
        const tableBody = document.querySelector("#schedule-table tbody");
        tableBody.innerHTML = ''; // Clear previous content

        scheduleData.forEach((daySchedule) => {
            const dayRow = document.createElement("tr");
            dayRow.innerHTML = `<td colspan="2" class="day-name">${daySchedule.day}</td>`;
            tableBody.appendChild(dayRow);

            daySchedule.subjects.forEach(subject => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="subject-name">${subject.name}<br><span class="teacher-name">${subject.teacher}</span></td>
                `;
                tableBody.appendChild(row);
            });
        });
    }

    function renderTasks() {
        const taskSection = document.getElementById("tasks");
        taskSection.innerHTML = '';
        taskData.forEach((task) => {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task-item");

            const dueDateString = task.dueDate.toLocaleString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            taskDiv.innerHTML = `<strong>${task.subject}</strong> - ${task.description}<br>Tenggat : ${dueDateString}`;
            taskSection.appendChild(taskDiv);

            const notificationTime = new Date(task.dueDate);
            notificationTime.setDate(notificationTime.getDate() - 1);
            notificationTime.setHours(19, 0, 0); // Set waktu ke jam 8 malam sehari sebelumnya
            if (notificationTime > new Date()) {
                scheduleNotification(notificationTime, task.subject);
            }
        });
    }

    function scheduleNotification(time, subject) {
        const now = new Date();
        const delay = time - now;
        if (delay > 0) {
            setTimeout(() => {
                new Notification("Pengingat Tugas", {
                    body: `Jangan lupa mengumpulkan tugas ${subject} besok!`,
                });
            }, delay);
        }
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    renderSchedule();
    renderTasks();

    const audio = document.getElementById('background-music');
    audio.play()
    });
});
