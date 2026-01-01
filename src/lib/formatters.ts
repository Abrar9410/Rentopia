
export function queryStringFormatter(searchParamsObj: { [key: string]: string | string[] | undefined }): string {
    let queryString = "";

    // {searchTerm: "John", specialty: "Cardiology"}
    // after entries: [ ["searchTerm", "John"], ["specialty", "Cardiology"] ]
    const queryArray = Object.entries(searchParamsObj).map(([key, value]) => {
        if (Array.isArray(value)) {
            // { specialty: ["Cardiology", "Neurology"] } 
            // ["Cardiology", "Neurology"]
            // ?specialty=Cardiology&specialty=Neurology
            return value.map((v) => `${key}=${encodeURIComponent(v)}`).join("&");
        }
        else if (value !== undefined) {
            return `${key}=${encodeURIComponent(value)}`;
        }
        return "";
    });

    queryString = queryArray.filter((q) => q !== "").join("&"); // searchTerm=John&specialty=Cardiology&specialty=Neurology
    
    return queryString;
};