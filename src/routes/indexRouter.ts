import express from 'express';
import { Request, Response } from 'express';
import { createEmailContact, sendDeliveryMessage, submitContactMessage } from '../core/utils/email.helpers';
import { ErrorPageData, VolunteerData } from '../models/models';
import { hasEmptyFields } from '../core/utils';
import { teamMembers } from '../values/team.values';
import { focusItems } from '../values/focus.values';
import { homeCarousels } from '../values/home_carousel.values';
import {
  focusPageStrings,
  aboutPageStrings,
  theNeedsPageStrings,
  anchorBiblePageStrings,
  visionAndMissionPageStrings,
  contactPageStrings,
  teamPageStrings,
  testimonialPageStrings,
  eventPageStrings,
  aboutMargaretPageStrings,
  beneficaryRegPageStrings
} from '../values/strings.values'
import { testimonialValues } from '../values/testimonial.values';
import { eventValues } from '../values/event.values';

export const router = express.Router();

router.get('/', (req, res) => {
  const page = 'home'; 
  res.render('home', {
    name: 'Home',
    currentPage: page,
    teamMembers: teamMembers,
    focusItems: focusItems,
    homeCarousels: homeCarousels,
    teamPageStrings: teamPageStrings,
    focusPageStrings: focusPageStrings, 
    aboutPageStrings: aboutPageStrings,
    theNeedsPageStrings: theNeedsPageStrings,
    anchorBiblePageStrings: anchorBiblePageStrings,
    testimonialValues: testimonialValues,
    testimonialPageStrings: testimonialPageStrings,

  });
});

router.get('/blog', (req, res) => {
  res.redirect(301, '/blog/');
});

router.get('/about', (req, res) => {
  const page = 'about'; 
  res.render('about', {
    name: 'About Us',
    currentPage: page,
    aboutPageStrings: aboutPageStrings,
    anchorBiblePageStrings: anchorBiblePageStrings,
    theNeedsPageStrings: theNeedsPageStrings,
    visionAndMissionPageStrings: visionAndMissionPageStrings,
   });
});

router.get('/404', (req, res) => {
  res.render('404', {name: 'Not Found'});
});

router.get('/contact', (req, res) => {
  const page = (req.params as any).page || 'contact'; 
  res.render('contact', {
    name: 'Contact Us',
    currentPage: page,
    contactPageStrings: contactPageStrings,
  });
});

router.get('/donate', (req, res) => {
  const page = (req.params as any).page || 'donate'; 
  res.render('donate', {name: 'Make Donation', currentPage: page });
});

router.get('/services', (req, res) => {
  const page = (req.params as any).page || 'services'; 
  res.render('services', {name: 'Services', currentPage: page });
});

router.get('/features', (req, res) => {
  const page = (req.params as any).page || 'features'; 
  res.render('features', {name: 'Services', currentPage: page });
});

router.get('/projects', (req, res) => {
  const page = (req.params as any).page || 'projects'; 
  res.render('projects', {name: 'Projects', currentPage: page });
});

router.get('/focus', (req, res) => {
  const page = (req.params as any).page || 'focus'; 
  res.render('focus', {
    name: 'Focus Area',
    currentPage: page,
    focusItems: focusItems,
    focusPageStrings: focusPageStrings,
  });
});

router.get('/team', (req, res) => {
  const page =  'team'; 
  res.render('team', {
    name: 'Our Team',
    currentPage: page,
    teamMembers: teamMembers,
    teamPageStrings: teamPageStrings,
  });
});

router.get('/testimonials', (req, res) => {
  const page = 'testimonials'; 
  res.render('testimonials', {
    name: 'Testimonials',
    currentPage: page,
    testimonialValues: testimonialValues,
    testimonialPageStrings: testimonialPageStrings,
  });
});

router.get('/volunteer', (req, res) => {
  res.render('volunteer', {name: 'Volunteer'});
}); 

router.get('/events', (req, res) => {
  res.render('events', {
    name: 'Events',
    eventValues,
    eventPageStrings: eventPageStrings,
  });
}); 

router.get('/about-margaret', (req, res) => {
  res.render('about-margaret', {
    name: 'About Mama Margaret',
    aboutMargaretPageStrings,
  });
}); 

router.get('/beneficiary-reg', (req, res) => {
  res.render('beneficiary-reg', {
    name: 'Beneficiary Registration',
    beneficaryRegPageStrings,
  });
}); 

// CONTACT POST ENDPOINT
router.post('/contact', async (req, res) => {
  try {
    const { email, name, subject, message } = req.body;
    if (!email || !name || !subject || !message) {
      const errorPageData: ErrorPageData = {
        errorTitle: 'Error Sending Message',
        errorDescription: 'Required form field(s) not provided',
        buttonTitle: 'Try again',
        buttonLink: '/contact',
      };
      (req.session as any).errorPageData = errorPageData;
      req.session.save();
      res.status(400).redirect('/error/message')
    } else {
      await createEmailContact(email, name);
      await submitContactMessage({ email, name, subject, message });
      await sendDeliveryMessage(email);
      res.redirect('/success/contact');
    }
  } catch (error) {
    console.error(`Error: $POST>/contact: ${JSON.stringify(error)}`);
    res.status(500).redirect('/error/server');
  }
});

// NEWSLETTER POST ENDPOINT
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      const errorPageData: ErrorPageData = {
        errorTitle: 'Error Subscribing',
        errorDescription: 'No valid email provided',
        buttonTitle: 'Try again',
        buttonLink: '/#footer-section',
      };
      (req.session as any).errorPageData = errorPageData;
      req.session.save();
      res.status(400).redirect('/error/message');
    } else {
      await createEmailContact(email, 'newsletter');
      res.redirect('/success/newsletter');
    }
  } catch (error) {
    console.error(`Error: $POST>/newsletter: ${error}`);
    res.status(500).redirect('/error/server');
  }
});


// CONTACT POST ENDPOINT
/* router.post('/volunteer', async (req, res) => {
  try {
    const volunteerData: VolunteerData = req.body;
    if (hasEmptyFields(volunteerData)) {
      const errorPageData: ErrorPageData = {
        errorTitle: 'Registration Failed',
        errorDescription: 'Required form field(s) not provided',
        buttonTitle: 'Try again',
        buttonLink: '/contact',
      };
      (req.session as any).errorPageData = errorPageData;
      req.session.save();
      res.status(400).redirect('/error/message')
    } else {
      await createEmailContact(volunteerData.email, volunteerData.firstName);
      //await submitContactMessage({ email, name, subject, message });
      res.redirect('/success/contact');
    }
  } catch (error) {
    console.error(`Error: $POST>/contact: ${error}`);
    res.status(500).redirect('/error/server');
  }
}); */