



    let arr = []

    show()
    
    function save() {
      const titleTask = document.getElementById("titleTask").value
      const detailTask = document.getElementById("detailTask").value
      const status = document.getElementById("status").value
      const percentageCompleted = document.getElementById("percentageCompleted").value
      const levelOfImportance = document.getElementById("levelOfImportance").value
      const timeLine = document.getElementById("timeLine").value
    
      let taskDate = getCurrentDate()
      let taskHours = getCurrentHours()
    
      const objectTask = {
        titleTask: titleTask,
        detailTask: detailTask,
        status: status,
        percentageCompleted: percentageCompleted,
        levelOfImportance: levelOfImportance,
        timeLine: timeLine,
        taskDate: taskDate,
        taskHours: taskHours,
      }
    
      clearMessageerror()
    
      if (!validationJS()) {
        return
      }
    
      arr.push(objectTask)
    
      displayTask()
    
      const json = JSON.stringify(arr)
      localStorage.setItem("task", json)
    }
    
    function displayTask() {
      const taskTable = document.getElementById("taskTable")
    
      taskTable.innerHTML = ""
    
      let i = 0
    
      for (let task of arr) {
        const statusColor = getStatusColor(task.status)
        const offcanvasID = `offcanvasRight_${i}`  // on doit increment avec i pour ne pas avoir le meme id a chaque fois
        const importance = getImportanceStars(task.levelOfImportance)
        const differenceDay = calculatDayTimeLine(task.timeLine, task.status)
        const detailList = putOnlineDetail(task.detailTask)
    
        let html = `<tr>
                                <td class="col-1"><a href="#myDivForm" ><button onclick="editRow(${i})" style="border:none"><img src="assets/images/edit.png" style="width: 40px; height: 40px;"</button></a></td>
                                <td class="col-2">${task.titleTask}</td>
                                <td class="col-1">${task.taskDate} <br> ${task.taskHours}</td>
        
                                <td class="col-1"><button class="btn btn-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#${offcanvasID}" aria-controls="${offcanvasID}">details</button>
        
                                <div class="offcanvas offcanvas-end" tabindex="-1" id="${offcanvasID}" aria-labelledby="${offcanvasID}Label">
                                <div class="offcanvas-header">
                                    <h5 class="offcanvas-title" id="${offcanvasID}Label">${task.titleTask}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div class="offcanvas-body">
                                    ${detailList} 
                                </div>
                                </div></td>
                                <td class="color col-1" style="background-color: ${statusColor}"><span style= "color:white">${task.status}</span></td>
                                <td class="col-1 "><div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${task.percentageCompleted}" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar bg-success" style="width: ${task.percentageCompleted}%; "></div>
                                </div><span>${task.percentageCompleted}%</span></td>
                                <td class="col-1">${importance}</td>
                                
                                <td class="col-1">${differenceDay}</td>
                                
                                <td class="col-1"><button onclick="deleteRow(${i})" style="border:none"><img src="assets/images/trash-bin.png" style="width: 35px; height: 35px;"</button></td>
        
                                
        
                            </tr>
                    `;
    
        taskTable.innerHTML += html
        i++

       
      }

      
      
    }
    
    
    
    function show() {
        const json = localStorage.getItem("task")
      
        if (json) {
          const taskArr = JSON.parse(json)
      
          for (let task of taskArr) {
            arr.push(task)
          }
      
          return displayTask()
        }
      }
    
    
    
      function editRow(i) {
        document.getElementById("titleTask").value = arr[i].titleTask
        document.getElementById("detailTask").value = arr[i].detailTask
        document.getElementById("status").value = arr[i].status
        document.getElementById("percentageCompleted").value =arr[i].percentageCompleted
        document.getElementById("levelOfImportance").value = arr[i].levelOfImportance
        document.getElementById("timeLine").value = arr[i].timeLine
      
        arr.splice(i, 1)

        localStorage.removeItem("task")
      
        localStorage.setItem("task", JSON.stringify(arr))
      
        displayTask()
    
      }
    
    
      function getCurrentDate() {

        let now = new Date()
      
        let day = now.getDate()
        let month = now.getMonth() + 1
        let year = now.getFullYear()
      
        if (day < 10) {
          day = "0" + day
        }
        if (month < 10) {
          month = "0" + month
        }
      
        return day + "/" + month + "/" + year
      }
      
      function getCurrentHours() {
        let now = new Date()
      
        let hour = now.getHours()
        let minute = now.getMinutes()
        if (minute < 10) {
          minute = "0" + minute
        }
        let second = now.getSeconds()
        if (second < 10) {
          second = "0" + second
        }
      
        const currentHour = hour + ":" + minute + ":" + second

        return currentHour
      }
    
    
      function putOnlineDetail(text) {

        const detail = text.split(`\n`)
      
        let detailList = ""
      
        detail.forEach((detail) => {
          detailList += `${detail}<br>`
        });
      
        return detailList
      }
    
    
    function statusDone() {
    
      if (document.getElementById("status").value === "Done") {
        document.getElementById("percentageCompleted").value = 100;
        document.getElementById("percentageCompleted").setAttribute("readonly", "")
      } 
      
      else if (document.getElementById("status").value === "Stuck") {
        document.getElementById("percentageCompleted").value = "";
        document.getElementById("percentageCompleted").removeAttribute("readonly")
      } 
      
      else if (document.getElementById("status").value === "Working On It") {
        document.getElementById("percentageCompleted").value = "";
        document.getElementById("percentageCompleted").removeAttribute("readonly")
      }
    
    }
    
    function getStatusColor(status) {
      switch (status) {
        case "Done":
          return "green"
        case "Working On It":
          return "orange"
        case "Stuck":
          return "red"
        default:
          return "transparent"
      }
    }
    
    function getImportanceStars(importance) {
      switch (importance) {
        case "Low":
          return "★☆☆"
        case "Medium":
          return "★★☆"
        case "High":
          return "★★★"
        default:
          return "☆☆☆"
      }
    }
    
    
    
    
    
    function calculatDayTimeLine(taskTime, status) {
      const getCurrentDateValue = getCurrentDate()
      const getCurrentDateSplit = getCurrentDateValue.split("/")
      // Convertissez le format de date de "jj/mm/aaaa" a "aaaa-mm-jj"
      const getCurrentDateNewForma =
        getCurrentDateSplit[2] +
        "-" +
        getCurrentDateSplit[1] +
        "-" +
        getCurrentDateSplit[0]
    
      let day1 = new Date(`${taskTime}`)
      let day2 = new Date(`${getCurrentDateNewForma}`)
    
      let difference = day1 - day2
      let days = difference / (1000 * 3600 * 24)
    
      if (status === "Done" && days < 0) {
        return "You succeed!<img src='assets/images/party.png' style='width: 30px; height: 30px;'/>"
      } else if (status === "Done" && days > 0) {
        return `You succeed! ${days} days remaining!<img src='assets/images/party.png' style='width: 30px; height: 30px;'/> `
      } else if (status === "Done" && days === 0) {
        return "You succeed!Last day to complete!<img src='assets/images/party.png' style='width: 30px; height: 30px;'/>"
      } else if (days < 0) {
        return "You failed this mission! <img src='assets/images/shocked.png' style='width: 30px; height: 30px;'/>"
      } else if (days === 0) {
        return "Last day to complete!<img src='assets/images/hourglassLastDay.png' style='width: 30px; height: 30px;'/>"
      } else {
        return ` ${days} days remaining!<img src='assets/images/hourglass.png' style='width: 30px; height: 30px;'/>`
      }
    }
    
    
    function deleteRow(i) {
        if (confirm(`Are you sure you want to delete '${arr[i].titleTask}' task ?`) ===
          true) {
          arr.splice(i, 1)
          localStorage.removeItem("task")
      
          localStorage.setItem("task", JSON.stringify(arr))
      
          displayTask()
        }
      }
    
    function formInitialization() {
      document.getElementById("titleTask").value = ""
      document.getElementById("detailTask").value = ""
      document.getElementById("status").value = "Choose..."
      document.getElementById("percentageCompleted").value = ""
      document.getElementById("levelOfImportance").value = "Choose..."
      document.getElementById("timeLine").value = "yyyy-MM-dd"
    }
    
    
    
    function validationJS() {
      const titleTask = document.getElementById("titleTask").value
      const detailTask = document.getElementById("detailTask").value
      const status = document.getElementById("status").value
      const percentageCompleted = document.getElementById("percentageCompleted").value
      const timeLine = document.getElementById("timeLine").value
    
      if (!titleTask) {
        event.preventDefault();
        document.getElementById("titleTask").focus()
        document.getElementById("messageErrorTitle").innerHTML =
          " * Missing title *"
    
        return false
    
      }
    
      if (titleTask.length > 30) {
        event.preventDefault()
        document.getElementById("titleTask").focus()
        document.getElementById("messageErrorTitle").innerHTML =
          "* To long Title, must be less than 30 caracters *"
    
        return false
      }
    
      if (!detailTask) {
        event.preventDefault()
        document.getElementById("detailTask").focus();
        document.getElementById("messageErrorTask").innerHTML =
          "* Missing details *"
    
        return false
      }
    
      if (detailTask.length < 3 || detailTask.length > 200) {
        event.preventDefault()
        document.getElementById("detailTask").focus()
        document.getElementById("messageErrorTask").innerHTML =
          "* Invalid details, enter details between 3 and 200 characters  *"
    
        return false
      }
    
      if (document.getElementById("status").selectedIndex === 0) {
        event.preventDefault()
        document.getElementById("status").focus()
        document.getElementById("messageErrorStatus").innerHTML =
          "* Missing status task*"
    
        return false;
      }
    
      if (!percentageCompleted) {
        event.preventDefault()
        document.getElementById("percentageCompleted").focus()
        document.getElementById("messageErrorPercentageCompleted").innerHTML =
          "* Missing percentage completed *"
    
        return false;
      }
    
      if (percentageCompleted <= 0 || percentageCompleted > 100) {
        event.preventDefault()
        document.getElementById("percentageCompleted").focus()
        document.getElementById("messageErrorPercentageCompleted").innerHTML =
          "* Invalid format, the percentage must be between 0 and 100 *"
    
        return false
      }
    
      if (document.getElementById("levelOfImportance").selectedIndex === 0) {
        event.preventDefault()
        document.getElementById("levelOfImportance").focus()
        document.getElementById("messageErrorlevelOfImportance").innerHTML =
          "* Missing level of Importance *"
    
        return false;
      }
    
      if (!timeLine) {
        event.preventDefault()
        document.getElementById("timeLine").focus()
        document.getElementById("messageErrorTimeLine").innerHTML =
          "* Missing time Line *"
    
        return false
      }
    
      return true
    }
    
    function clearMessageerror() {
      document.getElementById("messageErrorTitle").innerHTML = ""
      document.getElementById("messageErrorTask").innerHTML = ""
      document.getElementById("messageErrorStatus").innerHTML = ""
      document.getElementById("messageErrorPercentageCompleted").innerHTML = ""
      document.getElementById("messageErrorlevelOfImportance").innerHTML = ""
      document.getElementById("messageErrorTimeLine").innerHTML = ""
    
    }
    







