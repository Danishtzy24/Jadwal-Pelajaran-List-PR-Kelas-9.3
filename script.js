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
            { name: "PKN (1 Jam)", teacher: "Lilik Haryani, S.Pd" },
            { name: "Tahfidz", teacher: "Jiah Ulhak, S.Pd" }
        ]},
        { day: "Jumat", subjects: [
            { name: "Bahasa Indonesia", teacher: "Nurain, S.Pd" },
            { name: "IPA", teacher: "H. Faqih Usman, M.Pd" },
            { name: "Qurdist", teacher: "Arini Saila Haq, Lc" }
        ]}
    ];

    const taskData = [
        {
            subject: "MTK",
            description: "Membuat tabel tentang bangun ruang. gambar (+nama), luas permukaan dan volume",
            dueDate: new Date("2024-09-04"),
            status: "kelar",
        },
        {
            subject: "IPS",
            description: "Kerjakan IPS bukpet hal 19 dan 20 (Tugas individu 1.1 dan Latihan 1.1)",
            dueDate: new Date("2024-09-04"),
            status: "kelar",
        },
        {
            subject: "Bahasa Indonesia",
            description: "Membuat video teks prosedur (ber kelompok)",
            dueDate: new Date("2024-09-06"),
            status: "belum kelar",
        },
         {
            subject: "SBK",
            description: "kerjakan lks seni rupa hal 20 serta hari senin depan disuruh membawa pensil dan buku gambar",
            dueDate: new Date("2024-09-09"),
            status: "kelar",
        },
        {
            subject: "PKN",
            description: "Tulis di buku (Kapan disahkan nya pancasila sebagai dasar negara)",
            dueDate: new Date("2024-09-10"),
            status: "kelar",
        },
        {
            subject: "IT",
            description: "Merangkum bukpet bab 4 di email nya pak Farel",
            dueDate: new Date("2024-09-10"),
            status: "kelar",
        },
    ];

    const examData = [
        {
            subject: "Bahasa Indonesia",
            description: "bagi yang remedial akan di kasih pertanyaan oleh bu Nur'ain tergantung nilainya (kkm 80)",
            date: new Date("2024-09-06"),
            status: "N/A",
        },
        // Tambahkan detail ulangan lainnya di sini
    ];

    const subjectColors = {
        "Bahasa Indonesia": "seagreen",
        "Bahasa Inggris": "seagreen",
        "PJOK": "seagreen",
        "SBK": "seagreen",
        "PKN": "seagreen",
        "IT": "seagreen",
        "SKI": "seagreen",
        "Tahfidz": "seagreen",
        "IPS": "seagreen",
        "Akidah Akhlak": "seagreen",
        "IPA": "seagreen",
        "MTK": "seagreen",
        // Tambahkan warna untuk mata pelajaran lainnya sesuai kebutuhan
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
            timeZoneName: "short"
        });
        document.getElementById("datetime").innerText = dateTimeString;
        

        // Update location and timezone
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            document.getElementById("location").innerText = `Lokasi: Lat ${latitude.toFixed(2)}, Long ${longitude.toFixed(2)} (WIB)`;
        });
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

    function renderExams() {
        const examTableBody = document.querySelector("#exam-table tbody");
        examTableBody.innerHTML = '';
        examData.forEach((exam) => {
            const examRow = document.createElement("tr");

            const dateString = exam.date.toLocaleString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            // Menentukan warna berdasarkan status
            const statusColor = exam.status === "kelar" ? "green" : "red";

            // Menentukan warna berdasarkan nama pelajaran
            const subjectColor = subjectColors[exam.subject] || "black";

            examRow.innerHTML = `
                <td style="color: ${subjectColor}">${exam.subject}</td>
                <td>${exam.description}</td>
                <td>${dateString}</td>
                <td style="color: ${statusColor}">${exam.status}</td>
            `;
            examTableBody.appendChild(examRow);

            const notificationTime = new Date(exam.date);
            notificationTime.setDate(notificationTime.getDate() - 1);
            notificationTime.setHours(19, 0, 0); // Set waktu ke jam 8 malam sehari sebelumnya
            if (notificationTime > new Date()) {
                scheduleNotification(notificationTime, `Ulangan ${exam.subject}`);
            }
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
    renderExams();
    renderTasks();
});
