const currentDate = new Date();
        const datesContainer = document.querySelector('.dates');
        const monthSelect = document.getElementById('month-select');
        const yearSelect = document.getElementById('year-select');

        function initSelectors() {
            for (let i = 0; i < 12; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${i + 1}月`;
                if (i === currentDate.getMonth()) option.selected = true;
                monthSelect.appendChild(option);
            }

            const currentYear = currentDate.getFullYear();
            for (let i = currentYear - 5000; i <= currentYear + 5000; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                if (i === currentYear) option.selected = true;
                yearSelect.appendChild(option);
            }
        }

        function renderCalendar() {
            const year = parseInt(yearSelect.value);
            const month = parseInt(monthSelect.value);
            const firstDay = new Date(year, month, 1).getDay();
            const lastDate = new Date(year, month + 1, 0).getDate();

            datesContainer.innerHTML = '';

            // Fill blank days before the first date
            for (let i = 0; i < firstDay; i++) {
                datesContainer.innerHTML += '<div></div>';
            }

            // Fill the days of the month
            for (let i = 1; i <= lastDate; i++) {
                const dateDiv = document.createElement('div');
                dateDiv.textContent = i;

                const today = new Date();
                if (
                    i === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear()
                ) {
                    dateDiv.classList.add('today');
                }

                // Add click event for date selection
                dateDiv.addEventListener('click', () => {
                    const selected = document.querySelector('.dates .selected');
                    if (selected) selected.classList.remove('selected');
                    dateDiv.classList.add('selected');
                    alert(`您选择的日期是：${year}年${month + 1}月${i}日`);
                });

                datesContainer.appendChild(dateDiv);
            }
        }

        document.getElementById('prev').addEventListener('click', () => {
            let month = parseInt(monthSelect.value);
            let year = parseInt(yearSelect.value);

            if (month === 0) {
                month = 11;
                year--;
            } else {
                month--;
            }

            monthSelect.value = month;
            yearSelect.value = year;
            renderCalendar();
        });

        document.getElementById('next').addEventListener('click', () => {
            let month = parseInt(monthSelect.value);
            let year = parseInt(yearSelect.value);

            if (month === 11) {
                month = 0;
                year++;
            } else {
                month++;
            }

            monthSelect.value = month;
            yearSelect.value = year;
            renderCalendar();
        });

        monthSelect.addEventListener('change', renderCalendar);
        yearSelect.addEventListener('change', renderCalendar);

        initSelectors();
        renderCalendar();