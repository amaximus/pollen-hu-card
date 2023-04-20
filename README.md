[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)

<p><a href="https://www.buymeacoffee.com/6rF5cQl" rel="nofollow" target="_blank"><img src="https://camo.githubusercontent.com/c070316e7fb193354999ef4c93df4bd8e21522fa/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76312e7376673f6c6162656c3d4275792532306d6525323061253230636f66666565266d6573736167653d25463025394625413525413826636f6c6f723d626c61636b266c6f676f3d6275792532306d6525323061253230636f66666565266c6f676f436f6c6f723d7768697465266c6162656c436f6c6f723d366634653337" alt="Buy me a coffee" data-canonical-src="https://img.shields.io/static/v1.svg?label=Buy%20me%20a%20coffee&amp;message=%F0%9F%A5%A8&amp;color=black&amp;logo=buy%20me%20a%20coffee&amp;logoColor=white&amp;labelColor=b0c4de" style="max-width:100%;"></a>
</p>

# Custom Lovelace card for pollen information in Hungary

This Lovelace custom card displays pollen information provided by Pollen Information Integration filtered based on concentration level. You will need to install first the [Pollen Information Hungary](https://github.com/amaximus/pollen_hu) integration from HACS.

### Installation

The easiest way to install it is through [HACS (Home Assistant Community Store)](https://github.com/hacs/frontend),
search for *Pollen Information* in the Frontend section and select Pollen Information for Hungary.<br />
If you are not using HACS, you may download plolen-hu-card.js and put it into
homeassistant_config_dir/www/community/pollen-hu-card/ directory.<br />

### Lovelace UI configuration

Please add the card to the resources in configuration.yaml:

```
resources:
  - {type: module, url: '/hacsfiles/pollen-hu-card/pollen-hu-card.js'}
```

### Options

#### Card options

| Name             | Type         | Required     | Default                 | Description                         |
| ---------------- | ------------ | ------------ | ----------------------- | ----------------------------------- |
| type             | string       | **required** |                         | `custom:pollen-hu-card`             |
| title            | string       | optional     | `Pollens`               | title                               |
| sensor_name      | string       | optional     | `pollen_hu`             | name of the sensor                  |
| above_level      | integer      | optional     | `2`                     | display pollens above level (see below) |

Value mappings for above_level (source: [ÁNTSZ](https://efop180.antsz.hu/polleninformaciok/)):

| Description | Concentration level | Icon color |
| ----------- | ------------------- | ---------- |
| not present | 0                   | grey       |
| low         | 1                   | green      |
| medium      | 2                   | yellow     |
| high        | 3                   | orange     |
| very high   | 4                   | red        |

Please find below an example of ui-lovelace.yaml card entry:

```yaml
    cards:
      - type: custom:pollen-hu-card
        above_level: 1
        title: Pollenek
```
Pollen information with above_level=0:

![Pollen above_level](https://raw.githubusercontent.com/amaximus/pollen-hu-card/main/pollen0.png)


## Thanks

Thanks to all the people who have contributed!

[![contributors](https://contributors-img.web.app/image?repo=amaximus/pollen-hu-card)](https://github.com/amaximus/pollen-hu-card/graphs/contributors)

