const VITE_API_URL = import.meta.env.VITE_API_URL

export async function deletePhotos(id) {
    const response = await fetch(`${VITE_API_URL}/photos/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token") || ""}` }
    })

    if (!response.ok) {

        const text = await response.text();
        throw new Error(`Failed to delete photo (${response.status}): ${text}`);
    }


    return true;
}

export async function updateAddress(cityId, street, number, addressId) {
    const response = await fetch(`${VITE_API_URL}/addresses${addressId}`, {
        method: "PUT",
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

export async function updateDescription(description, descriptionId) {
    const response = await fetch(`${VITE_API_URL}/descriptions/${descriptionId}`, {
        method: "PUT",
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

export async function updateContacts(contactsId, {
    phoneNumber,
    email,
    instagram,
    telegram,
    facebook,
    officialWebsite,
}) {
    const contactData = {
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        instagram: instagram.trim(),
        telegram: telegram.trim(),
        facebook: facebook.trim(),
        officialWebsite: officialWebsite.trim()
    };

    const response = await fetch(`${VITE_API_URL}/contacts/${contactsId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify(contactData),
    });

    const data = await response.json();
    return data;
}


export async function updateEvent(eventId, eventData) {
    const response = await fetch(`${VITE_API_URL}/events/${eventId}`, {
        method: "PUT",
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
