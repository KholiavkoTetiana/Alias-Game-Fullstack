import {BASEURL} from "./model.js";

export function renderRating(){
    fetch(`${BASEURL}/game_rating`, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            const rating = document.getElementById("rating-body");
            rating.innerHTML = "";

            data.forEach((item, index) => {
                const row = document.createElement("tr");

                row.innerHTML =
                    `<td>${index + 1}</td>
                 <td>${item.teams_name}</td>
                 <td>${item.winner_name}</td>
                 <td>${Math.floor(item.duration_seconds / 60)} хв ${item.duration_seconds % 60} с</td>
                 <td style="white-space: nowrap;">${item.created_at}</td>`;
                rating.appendChild(row);
            });
            console.log("виклик renderRating:", data);
        });
}

