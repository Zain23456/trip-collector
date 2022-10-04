import { Profile } from '../models/profile.js'

function index(req, res) {
  console.log("PROFILES")
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: 'Profiles'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/")
  })
}

function showProfile (req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render('profiles/show', {
    title: `${profile.name}'s profile`,
    profile,
    isSelf
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  index,
  showProfile as show,
}