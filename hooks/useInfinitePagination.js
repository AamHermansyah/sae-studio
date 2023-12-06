import { useEffect, useState } from "react"
import { collection, query, startAfter, limit, getDocs, where } from 'firebase/firestore'
import { db } from "../firebase";

export default function useInfinitePagination(collectionName, pageNumber = 1, maxLimit = 10, whereQuery = 'all'){
    const [data, setData] = useState([]);
    const [lastVisible, setLastVisible] = useState([]);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLastData, setIsLastData] = useState(false);

    useEffect(() => {
        setLoading(true);

        // reset data
        if(pageNumber === 1) {
            setData(prev => []);
            setIsLastData(false);
        };

        let q;
        
        if(whereQuery === 'all'){
            q = pageNumber === 1 ?
            query(collection(db, collectionName), limit(maxLimit)) :
            query(collection(db, collectionName), startAfter(lastVisible), limit(maxLimit));
        } else {
            const [field, equal, value] = whereQuery.split(" ");

            q = pageNumber === 1 ?
            query(collection(db, collectionName), limit(maxLimit), where(field, equal, value)) :
            query(collection(db, collectionName), startAfter(lastVisible), limit(maxLimit), where(field, equal, value));
        }

        getDocs(q)
            .then(response => {
                const resData = response.docs.map(doc => ({...doc.data(), id: doc.id}));
                if(resData.length > 0){
                    if(resData.length < maxLimit) setIsLastData(true);
                    if(pageNumber === 1){
                        setData(prevData => resData);
                    } else {
                        setData(prevData => [...prevData, ...resData]);
                    }
                    setLastVisible(response.docs[response.docs.length - 1]);
                } else setIsLastData(true);
            })
            .catch(err => {
                setIsError(true);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [pageNumber, whereQuery]);

    return { data, isError, loading, isLastData }
}