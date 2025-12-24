





function regionName(region) {
    switch (region?.toLowerCase()) {
        case "africa":
            return "region-africa";

        case "americas":
            return "region-americas";

        case "asia":
            return "region-asia";

        case "europe":
            return "region-europe";

        case "oceania":
            return "region-oceania";

        default:
            return "ongeldige-regio";
    }
}




export default regionName;