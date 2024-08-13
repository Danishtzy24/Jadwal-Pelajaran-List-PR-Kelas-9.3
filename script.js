document.addEventListener("DOMContentLoaded", () => {
    const scheduleData = [
        { day: "Senin", subjects: [
            { name: "SBK", teacher: "Ida Farida, S.Ag" },
            { name: "IPS", teacher: "Eko Suwarmo, S.Pd" },
            { name: "PJOK", teacher: "Rismanto, S.Pd., MA" },
            { name: "Bahasa Inggris", teacher: "Siti Suryani, S.Pd" },
            { name: "Bahasa Indonesia", teacher: "Nurain, S.Pd" }
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
            { name: "Bahasa Arab", teacher: "H. Taufik Husein, SS., M.Pd" },
            { name: "PKN (1jam)", teacher: "Lilik Haryani, S.Pd" },
            { name: "Tahfidz", teacher: "Jiah Ulhak, S.Pd" }
        ]},
        { day: "Jumat", subjects: [
            { name: "Bahasa Indonesia", teacher: "Nurain, S.Pd" },
            { name: "IPA", teacher: "H. Faqih Usman, M.Pd" },
            { name: "Qurdist", teacher: "Arini Saila Haq, Lc" }
        ]}
    ];

    const taskData = [
        // List tugas yang bakal terupdate setiap hari Senin - Jumat (Berdasarkan catatan tugas yang Danish Catet)
        {
            subject: "Bahasa Arab",
            description: "Terjemahin Bukpet Hal 5 dan 6 (Semuanya)",
            dueDate: new Date("2024-08-14"),
            status: "belum kelar",
        },
        {
            subject: "IPS",
            description: "Buat PPT tentang Modernisasi (Bagi yang blm)",
            dueDate: new Date("2024-08-14"),
            status: "kelar",
        },
        {
            subject: "Akidah Akhlak",
            description: "Menulis dalil yang berhubungan dengan hari akhir/kiamat",
            dueDate: new Date("2024-08-15"),
            status: "belum kelar",
        },
        {
            subject: "Akidah Akhlak",
            description: "Menulis nama nama hari akhir beserta dalil nya",
            dueDate: new Date("2024-08-15"),
            status: "belum kelar",
        },
        {
            subject: "Akidah Akhlak",
            description: "Menulis ciri ciri perilaku orang yang mencerminkan sifat kepada hari akhir/kiamat",
            dueDate: new Date("2024-08-15"),
            status: "belum kelar",
        },
    ];

    const subjectColors = {
        "Bahasa Indonesia": "seagreen",
        "PJOK": "seagreen",
        "SBK (Jika Sudah Menggambar)": "seagreen",
        "PKN": "seagreen",
        "IT": "seagreen",
        "SKI": "seagreen",
        "Tahfidz": "seagreen",
        "FIKIH": "seagreen",
        "MTK": "seagreen",
        "Akidah Akhlak": "seagreen",
        "Bahasa Arab": "seagreen",
    };

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

            // Menentukan warna berdasarkan status
            const statusColor = task.status === "kelar" ? "green" : "red";

            // Menentukan warna berdasarkan nama pelajaran
            const subjectColor = subjectColors[task.subject] || "black";

            taskDiv.innerHTML = `
                <strong style="color: ${subjectColor}">${task.subject}</strong> - ${task.description}<br>
                Tugasnya Danish: <span style="color: ${statusColor}">${task.status}</span><br>
                Tenggat: ${dueDateString}
            `;
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
    audio.remove().catch(error => {
        console.log('Autoplay prevented:', error);
    });
});
