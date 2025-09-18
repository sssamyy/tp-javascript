var lignes=0; var total_points=0;

function doInsertRowTable(num, nom, prenom, points){

    const table =document.getElementsByTagName("table")[0];

    row=document.createElement("tr");

    row.setAttribute("class","row");

    col1=document.createElement("td");
    col2=document.createElement("td");
    col3=document.createElement("td");
    col4=document.createElement("td");
    col5=document.createElement("td");

    col1.innerText=num;
    col2.innerText=nom;
    col3.innerText=prenom;
    col4.innerText=points;
    col5.innerHTML = '<input type="checkbox"/>';



    col1.setAttribute("class","col_number");
    col2.setAttribute("class","col_text");
    col3.setAttribute("class","col_text");
    col4.setAttribute("class","col_number");
    col5.setAttribute("class","col_chkbox");

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);
        
    table.appendChild(row);
}

persons=[
    {
        nom:"nom-1",
        prenom:"prenom-1",
        points:5
    },
    {
        nom:"nom-2",
        prenom:"prenom-2",
        points:10
    },
    {
        nom:"nom-3",
        prenom:"prenom-3",
        points:15
    },
    
];

init();

function init(){
    for (person of persons) {
        doInsert(person.nom,person.prenom,person.points);
    }
}

function doInsert(nom, prenom, points){
  total_points+=points; 
    lignes++;   
    doInsertRowTable(lignes, nom, prenom, points);
    update_summary(); /*que etape 4*/
}

function consoleTableau(){
    console.log(persons);
}

function update_summary(){

    element_lignes=document.getElementById("p1");
    element_points=document.getElementById("p3");

    element_lignes.innerText=lignes+" lignes(s)";
    element_points.innerText="Total point(s)="+total_points;
}

function doNewData(){

    const elt_nom=document.getElementById("form_nom");
    const elt_prenom=document.getElementById("form_prenom");
    const elt_points=document.getElementById("form_points");

    nom=elt_nom.value;
    prenom=elt_prenom.value;
    points=parseInt(elt_points.value);

    

    elt_nom.innerText="";
    elt_prenom.innerText="";
    elt_points.innerText="";

    if(nom=="" || prenom=="" || Number.isNaN(points))
		alert("Formulaire incomplet !");
	else{
        doInsert(nom,prenom,points);    
        persons.push({nom,prenom,points});
        elt_nom.value = "";
		elt_prenom.value = "";
		elt_points.value = "";
    }
}
function deleteRow(){
    if (lignes<=0) {
        alert("Tableau déja vide !");
    }
    else{
        table = document.getElementsByTagName("table")[0];
        chkbox_list=table.querySelectorAll(".col_chkbox input");
        isOneChecked=false;
        for (let i = 0; i < chkbox_list.length; i++) {
            if (chkbox_list[i].checked) {
                isOneChecked=true;
            }
            
        }
        if(!isOneChecked){
            alert("Sélectionnez au moins une ligne !");
        }
        else{
            if(confirm('Voulez-vous vraiment supprimer les lignes ?')){
                element_found = false;
                table=document.getElementsByTagName("table")[0];
                rows=table.getElementsByClassName("row");
                let i=0;

                while (i<rows.length) {
                    if (rows[i].lastChild.firstChild.checked) {
                        total_points=total_points-parseInt(rows[i].childNodes[3].innerText);
                        rows[i].remove();
                        persons.splice(i,1);
                        element_found =true;
                        i--;
                        lignes--;
                    }
                    i++;
                }
                alert("Ligne supprimée avec succés !");
                update_summary();
            }
        }
    }
}

function filterTable() {
    const searchValue = document.getElementById("searchBox").value.toLowerCase();
    const rows = document.querySelectorAll(".row");
    let visibleRowCount = 0; // Compteur pour les lignes visibles
    let visiblePointsTotal = 0; // Compteur pour les points visibles

    rows.forEach(row => {
        const name = row.children[1].innerText.toLowerCase();
        const surname = row.children[2].innerText.toLowerCase();
        
        // Vérifie si le nom ou prénom contient la valeur de recherche
        if (name.includes(searchValue) || surname.includes(searchValue)) {
            row.style.display = ""; // Affiche la ligne
            visibleRowCount++; // Incrémente le compteur si la ligne est visible
            visiblePointsTotal += parseInt(row.children[3].innerText); // Ajoute les points visibles
        } else {
            row.style.display = "none"; // Masque la ligne
        }
    });

    // Mise à jour du nombre de lignes visibles
    document.getElementById("p1").innerText = `${visibleRowCount} ligne(s) visible(s)`;
    // Mise à jour du total des points visibles
    document.getElementById("p3").innerText = `Total des points visibles = ${visiblePointsTotal}`;
}

