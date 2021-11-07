import React, {useEffect, useState} from "react";
import Link from "../components/Link/link";
import List from "../components/List/list";
import styled from "styled-components";

const ProfileWrapper = styled.div`width: 50%; margin: 10px auto`

const Avatar = styled.img`width: 150px`

const Profile = () => {
    const [profile, setProfile] = useState([])
    const [loading, setLoading] = useState(true)
    const [repositories, setRepositories] = useState([])

    useEffect(() => {
        const fetchProfile = async () => {
            const profile = await fetch('https://api.github.com/users/guttume')
            const profileJSON = await profile.json()

            if (profileJSON) {
                const repositories = await fetch(profileJSON.repos_url)
                const repositoriesJSON = await repositories.json()
                setRepositories(repositoriesJSON)
                setProfile(profileJSON)
                setLoading(false)
            }
        }

        fetchProfile()
    }, [])

    const items = [
        {label: 'html_url', value: <Link url={profile.html_url} title='Github URL'/>},
        {label: 'repos_url', value: profile.repos_url},
        {label: 'name', value: profile.name},
        {label: 'company', value: profile.company},
        {label: 'location', value: profile.location},
        {label: 'email', value: profile.email},
        {label: 'bio', value: profile.bio},
    ]

    const projects = repositories.map(repo => ({
        label: repo.name,
        value: <Link url={repo.html_url} title='Github URL' />
    }))

    return (
        <>
            {
                loading ? <div>Loading...</div> :
                    <ProfileWrapper>
                        <Avatar src={profile.avatar_url} alt="avatar" className='Profile-avatar'/>
                        <List title='Profile' items={items}/>
                        <List title='Projects' items={projects} />
                    </ProfileWrapper>
            }
        </>
    )
}

export default Profile
