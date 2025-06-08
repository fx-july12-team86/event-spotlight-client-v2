const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function addSeveralPhotos(photos) {
    const formData = new FormData();

    photos.forEach((photo) => {
        formData.append("photos", photo);
    });

    const response = await fetch(`${VITE_API_URL}/photos/several`, {
        method: "POST",
        headers: {

            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: formData,
    });
    const data = await response.json();
    return data;
}

export async function addAddress(cityId, street, number) {
    const response = await fetch(`${VITE_API_URL}/addresses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify({
            cityId,
            street,
            number,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create address");
    }

    const data = await response.json();
    return data;
}

export async function addDescription(description) {
    const response = await fetch(`${VITE_API_URL}/descriptions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify({
            description
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create description");
    }

    const data = await response.json();
    return data;
}

export async function addContacts({
    phoneNumber,
    email,
    instagram,
    telegram,
    facebook,
    officialWebsite
}) {
    const contactData = {
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        instagram: instagram.trim(),
        telegram: telegram.trim(),
        facebook: facebook.trim(),
        officialWebsite: officialWebsite.trim()
    };

    const response = await fetch(`${VITE_API_URL}/contacts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify(contactData),
    });

    const data = await response.json();
    return data;
}


export async function createEvent(eventData) {
    console.log(eventData)
    const response = await fetch(`${VITE_API_URL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify({
            title: eventData.title,
            descriptionId: eventData.descriptionId,
            userId: eventData.userId,
            contactId: eventData.contactId,
            addressId: eventData.addressId,
            photoIds: eventData.photosIds,
            categoryIds: eventData.categoryIds,
            startTime: eventData.startTime,
            price: eventData?.price,
            isOnline: eventData.isOnline,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create event");
    }

    const data = await response.json();
    return data;
}

